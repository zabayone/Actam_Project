const constraints = {audio: true, video: false};
let currStream  = null;
let source = null;
let analyser = null;
let buffer = new Float32Array(1024);
let rafID = null;
const MAX_LENGTH = 20;
const TOTAL_SECS = 150;
let check_values = new Array(TOTAL_SECS);    
let last_values = new Array(MAX_LENGTH);
let index=0;
let index2=0;
let zeroCounter=0;
var values; // array of the indexes of the active exercises 
var types; // array of the indexes of the active exercises 
let storage;
let day;
let cat;
let test;
var midi_arr = [];
let chosen_type = -1;
let root = 0;
var rep_index = 0;
var reps = 3;
var checked = 1;
let isTracking = false;
let check_avg = 0;    

const enableMicBtn = document.getElementById("enable-mic");
const noteElem = document.getElementById("note");
const hzElem = document.getElementById("hz");
const detuneElem = document.getElementById("cents");
const flat = document.getElementById("flat");
const sharp = document.getElementById("sharp");
const microphoneStatus = document.getElementById("microphoneStatus");
const level_description = document.getElementById("levelDescription");
const level_counter = document.getElementById("levelCounter");
const prompt = document.getElementById("exercisePrompt");

function showResultModal(passed) {
    const modal = document.getElementById('resultModal');
    const resultMessage = document.getElementById('resultMessage');
    const resultsButton = document.getElementById('resultsButton'); // Único botón

    // Mostrar el mensaje de resultado
    if (passed) {
        resultMessage.textContent = `¡Congratulations, go for the next section! Score: ${score} / ${reps}`;
    } else {
        resultMessage.textContent = `¡Better luck next time! Score: ${score} / ${reps}`;
    }

    // Mostrar el modal
    modal.style.display = 'flex';

    // Configurar el botón "Ver resultados"
    resultsButton.onclick = () => {
        // Guardar los resultados antes de redirigir
         // Asegúrate de que esta función guarde los datos necesarios
        seeResults(); // Redirigir a la página de resultados
    };
}

// https://github.com/cwilso/PitchDetect/blob/main/js/pitchdetect.js
var MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
var GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be
function autoCorrelate( buf, sampleRate ) {
	var SIZE = buf.length;
	var MAX_SAMPLES = Math.floor(SIZE/2);
	var best_offset = -1;
	var best_correlation = 0;
	var rms = 0;
	var foundGoodCorrelation = false;
	var correlations = new Array(MAX_SAMPLES);

	for (var i=0;i<SIZE;i++) {
		var val = buf[i];
		rms += val*val;
	}
	rms = Math.sqrt(rms/SIZE);
	if (rms<0.01) // not enough signal
		return -1;

	var lastCorrelation=1;
	for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
		var correlation = 0;

		for (var i=0; i<MAX_SAMPLES; i++) {
			correlation += Math.abs((buf[i])-(buf[i+offset]));
		}
		correlation = 1 - (correlation/MAX_SAMPLES);
		correlations[offset] = correlation; // store it, for the tweaking we need to do below.
		if ((correlation>GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
			foundGoodCorrelation = true;
			if (correlation > best_correlation) {
				best_correlation = correlation;
				best_offset = offset;
			}
		} else if (foundGoodCorrelation) {
			// short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
			// Now we need to tweak the offset - by interpolating between the values to the left and right of the
			// best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
			// we need to do a curve fit on correlations[] around best_offset in order to better determine precise
			// (anti-aliased) offset.

			// we know best_offset >=1, 
			// since foundGoodCorrelation cannot go to true until the second pass (offset=1), and 
			// we can't drop into this clause until the following pass (else if).
			var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];  
			return sampleRate/(best_offset+(8*shift));
		}
		lastCorrelation = correlation;
	}
	if (best_correlation > 0.01) {
		// console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
		return sampleRate/best_offset;
	}
	return -1;
//	var best_frequency = sampleRate/best_offset;
}

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteFromPitch( frequency ) {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}

function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}

function centsOffFromPitch( frequency, note ) {
	return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
}

function getMicrophoneStream() {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            currStream = stream;
            console.log('got microphone stream');
            console.log(stream);

            audioContext = new AudioContext();
            source = audioContext.createMediaStreamSource(stream);
            startPitchTrack();
        })
        .catch(function (err) {
            console.error("Error accessing microphone:", err);
            alert("Turning on microphone is blocked");
            enableMicBtn.innerHTML = "Enable Microphone";
            enableMicBtn.setAttribute("data-tracking", "false"); // Asegúrate de resetear el estado
        });
}

function stopMicrophoneStream(){
    if(currStream !== null){
        let tracks = currStream.getTracks();
        console.log(tracks);

        for(let i=0; i<tracks.length;i++){
            tracks[i].stop();
        }
    }
    window.cancelAnimationFrame(rafID);
}

function startPitchTrack(){
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    getPitch();
}

async function getPitch(){
    analyser.getFloatTimeDomainData(buffer);
    let frequencyInHz = autoCorrelate(buffer, audioContext.sampleRate);
    //console.log(frequencyInHz);
    if (frequencyInHz!=-1){
        zeroCounter=0;
        last_values[index] = frequencyInHz;
        check_values[index2] = frequencyInHz;
        //move the index 
        index = (index + 1) % MAX_LENGTH;
        
        let averageFreq = 0;
        for(let i=0;i<MAX_LENGTH;i++){
            averageFreq=averageFreq+frequencyInHz;
        }
        if (index2 == TOTAL_SECS-1){
            main();
            checked = 1
            index2 = 0;
            for await (const val of check_values) {
                check_avg = check_avg + val;
            }
            check_avg = check_avg/TOTAL_SECS;
            root_pitch = 440*(2^((root-69)/12))
            console.log(check_avg);
            console.log("root = " + root + " " + root_pitch);
            let midiNote = noteFromPitch(check_avg);

            if (midiNote == root){
                let detune = centsOffFromPitch(check_avg, midiNote);
                if (detune < 15 && detune > -15) {
                    storage.setCorrect(chosen_type, curr_idx);
                }
                else {
                    storage.setIncorrect(chosen_type, curr_idx);
                }
            }
            else {
                storage.setIncorrect(chosen_type, curr_idx);
            }

        }
        index2 = (index2 + 1)
        averageFreq=averageFreq/MAX_LENGTH;
        //We could make it faster only substracting the las value and adding the new one

        if(index===0){
            let midiNote = noteFromPitch(averageFreq); 
            noteElem.innerHTML = noteStrings[midiNote%12];
            //hzElem.innerHTML = averageFreq;
            detune = centsOffFromPitch(averageFreq,midiNote);
            detuneElem.innerHTML = detune;
            if (detune<0){
                flat.style.color = "red";
                sharp.style.color = "white";
            }
            else{
                sharp.style.color = "red";
                flat.style.color = "white";
            }
            if(detune < 15 && detune > -15) {
                flat.style.color = "lawngreen";
                sharp.style.color = "lawngreen";
            }
        }
    }
    else{
        zeroCounter++;
        if (zeroCounter%(MAX_LENGTH*10)==0){
            noteElem.innerHTML = "-";
            detuneElem.innerHTML = "-";
        }
    }

    rafID = window.requestAnimationFrame(getPitch);
}

function main(){
    
    isTracking = enableMicBtn.getAttribute("data-tracking") === "true";
    enableMicBtn.setAttribute("data-tracking", !isTracking);

    if(!isTracking===true){
        microphoneStatus.innerHTML = "Enabling Microphone...";
        getMicrophoneStream();
        enableMicBtn.classList.add("active");
        microphoneStatus.innerHTML = "Microphone Enabled";

    }
    else{
        microphoneStatus.innerHTML = "Disabling Microphone...";
        enableMicBtn.classList.remove("active");
        stopMicrophoneStream(); 
        microphoneStatus.innerHTML = "Microphone Disabled";
    }
}

function saveAndGoHome(){
    storage.localStore() 
    day.addExercise(storage)
    document.location.href = '/'
}

async function midiToNote(midi){
    var relative = (midi - 60)
    var oct_shift = Math.floor(relative/12)
    while(relative < 0) relative += 12;
    var idx = relative%12
    var note = notes[idx] + (4+oct_shift).toString()
    return note
}

async function midiToFreq(midi){
    return 440 * Math.pow(2, (midi - 69) / 12);
}

async function playNoteFromMIDI(midi_arr, type){
    let note_arr = []
    i = 0;
    for (midi of midi_arr) {
        note_arr.push(await midiToNote(midi))
    }
    Tone.loaded().then(()=>{
        sampler.triggerAttackRelease(note_arr, 1.2);
    });
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const sampler = new Tone.Sampler({
    urls:{
        C4:  '/assets/Notes/C.wav',
        Db4: '/assets/Notes/Db.wav', 
        D4:  '/assets/Notes/D.wav',
        Eb4: '/assets/Notes/Eb.wav', 
        E4:  '/assets/Notes/E.wav',  
        F4:  '/assets/Notes/F.wav', 
        Gb4: '/assets/Notes/Gb.wav',  
        G4:  '/assets/Notes/G.wav', 
        Ab4: '/assets/Notes/Ab.wav',  
        A4:  '/assets/Notes/A.wav', 
        Bb4: '/assets/Notes/Bb.wav',  
        B4:  '/assets/Notes/B.wav'  
    },
    release: 1,
}).toDestination();


async function next(){ // function that creates the next
    console.log("in next")
    if (rep_index < reps){
        if (checked) {
            checked = 0
            midi_arr = []
            let idx = Math.floor(Math.random() * values.length)
            curr_val = values[idx]
            curr_idx = idx
            root = Math.floor(Math.random() * 20) + 48
            let ones = []
            for (let i = 0; i < types.length; i++) {
                if(parseInt(types[i])){
                    ones.push(i)
                }
                
            }
            let idx_2 = Math.floor(Math.random() * ones.length)
            chosen_type = ones[idx_2]
            midi_arr.push(root)
            playNoteFromMIDI(midi_arr);
            rep_index = rep_index+1;
            note = root%12
            level_counter.textContent = `${rep_index} / ${reps}`;
            let direction = '';
            switch (chosen_type) {
                case 0: 
                    direction = 'up';
                break;
                case 1: 
                    direction = 'down';
                break;
            }
            let string = `<p>Sing the note a ${interval_text[curr_val]} ${direction} from the played note </p><p>continue singing until the mic gets turned off</p>`;
            console.log(chosen_type);
            console.log(string);
            prompt.innerHTML = string;

        }
    } else {
        if(parseInt(test) == 1 ){
            let pair = storage.calculateTotalCorrectResults();
            score = pair[0];
            console.log(score);

            if(score/pair[1]>0.9){
                showResultModal(true);
                //Add condition to this to only happen if the the level is succed.
                let actualLevel =parseInt(localStorage.getItem(lvlInfo[parseInt(cat)]))
                if(parseInt(localStorage.getItem('level')) == 4*actualLevel){
                    actualLevel=String(actualLevel+1);
                    localStorage.setItem(lvlInfo[parseInt(cat)],actualLevel);
                    console.log("Asking to update the database");
                    const lvlUpdateEvent = new CustomEvent('lvlUpdate', { 
                        detail: { lvl: actualLevel }
                    });
                    document.dispatchEvent(lvlUpdateEvent);
                }
            }
            else{
                showResultModal(false);
            }
        }else{seeResults();
        }
    }
}

function seeResults(){
    storage.localStore()
    day.addExercise(storage)
    document.location.href = '/ear-training/results.html'
}

async function init () {
    cat = localStorage.getItem("category")
    let key = localStorage.getItem("key")
    let type = localStorage.getItem("type")
    test = localStorage.getItem("test")

    console.log(cat, key, type, test)

    level_description.textContent = `Level ${localStorage.getItem("level")}`;
    values = key.split('-')
    types = type.split('-')
    storage = new ExerciseContainer(values.length, null)
    day = new DayContainer(null)

    if(test == 1) {
        key_div.style.display = 'contents'
        key_div.innerHTML = ''
    }
    await next()
    console.log(root)
}

function playAgain(){
    playNoteFromMIDI(midi_arr, chosen_type);
}

init();
enableMicBtn.onclick = main;
level_counter.textContent = `${rep_index} / ${reps}`;


