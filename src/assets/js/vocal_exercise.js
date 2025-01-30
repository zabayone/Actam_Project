
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

function getMicrophoneStream(){
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream){
            currStream = stream;
            console.log('got microphone stream');
            console.log(stream);

            audioContext = new AudioContext();

            source = audioContext.createMediaStreamSource(stream);
            
            startPitchTrack();
        })
        .catch(function(err){
            alert("Turning on microphone is blocked");
            enableMicBtn.innerHTML = "Enable Microphone";
            // I think she forgot to turn the button to false
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

function getPitch(){
    analyser.getFloatTimeDomainData(buffer);
    let frequencyInHz = autoCorrelate(buffer, audioContext.sampleRate);
    console.log(frequencyInHz);

    if (frequencyInHz!=-1){
        zeroCounter=0;
        
        last_values[index] = frequencyInHz;
        //move the index 
        index = (index + 1) % MAX_LENGTH;

        let averageFreq = 0;
        for(let i=0;i<MAX_LENGTH;i++){
            averageFreq=averageFreq+frequencyInHz;
        }
        averageFreq=averageFreq/MAX_LENGTH;
        //We could make it faster only substracting the las value and adding the new one

        if(index===0){
            let midiNote = noteFromPitch(averageFreq); 
            noteElem.innerHTML = noteStrings[midiNote%12];
            //hzElem.innerHTML = averageFreq;
            detune = centsOffFromPitch(averageFreq,midiNote);
            //detuneElem.innerHTML = detune;
 s           // if (detune<0){
            //     detuneWarning.innerHTML="FLAT";
            //     detuneWarning.className= "out-tune";
            // }
            // else{
            //     detuneWarning.innerHTML="SHARP";
            //     detuneWarning.className= "out-tune";
            // }

            // if(detune < 10 && detune > -10) {
            //     detuneWarning.innerHTML= "IN-TUNE";
            //     detuneWarning.className= "in-tune";
            // }
        }
    }
    else{
        zeroCounter++;
        if (zeroCounter%(MAX_LENGTH*10)==0){
            noteElem.innerHTML = "-";
            hzElem.innerHTML = "-";
            detuneElem.innerHTML = "-";
            detuneWarning.innerHTML= "-";
        }
    }

    rafID =window.requestAnimationFrame(getPitch);
}

const constraints = {audio: true, video: false};

let currStream  = null;

let source = null;

let analyser = null;

let buffer = new Float32Array(1024);

let rafID = null;

const MAX_LENGTH = 20;
let last_values = new Array(MAX_LENGTH);
let index=0;
let zeroCounter=0;

const enableMicBtn = document.getElementById("enable-mic");
const noteElem = document.getElementById("note");
const hzElem = document.getElementById("hz");
const detuneElem = document.getElementById("detune");
const detuneWarning = document.getElementById("detune-warning");
const microphoneStatus = document.getElementById("microphoneStatus");


enableMicBtn.onclick = main;

function main(){

    let isTracking = enableMicBtn.getAttribute("data-tracking") === "true";
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