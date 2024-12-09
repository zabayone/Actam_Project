// global variables
var cat
var type
var key
var test

// Running state
var is_keyboard = 1
var is_test = 0
var root = []           // MIDI of the root note
var audio_buffs = []    // Buffers for the 12 notes in the octave
var file_names =  [ '/assets/Notes/C.wav',
                    '/assets/Notes/Db.wav', 
                    '/assets/Notes/D.wav',
                    '/assets/Notes/Eb.wav', 
                    '/assets/Notes/E.wav',  
                    '/assets/Notes/F.wav', 
                    '/assets/Notes/Gb.wav',  
                    '/assets/Notes/G.wav', 
                    '/assets/Notes/Ab.wav',  
                    '/assets/Notes/A.wav', 
                    '/assets/Notes/Bb.wav',  
                    '/assets/Notes/B.wav'  ]
var values; // array of the indexes of the active exercises 

var pressed_keys = [];  // Array used to store the pressed keys in order to avoid multiple presses if held
var octave = 0          // Octave shift for the keyboard
/*
var rep_index = 0;
var button_list = []; // Container of the HTML for the buttons
var curr_val = 1;     // Exercise value
var note_list = [];   // List of frequencies of the current exercise
var checked = 1;
*/
//keyboards variables

// Volume settings
const volumes = {
    piano: 0.7, // Volume for piano
    guitar: 0.5, // Volume for guitar
    synth: 0.6 // Volume for synth
};

// Map keys to relative MIDI values (MIDI values start from 60 for C4)
const keyToMidi = {
    'a': 60,  // C4
    'w': 61,  // C#4
    's': 62,  // D4
    'e': 63,  // D#4
    'd': 64,  // E4
    'f': 65,  // F4
    't': 66,  // F#4
    'g': 67,  // G4
    'y': 68,  // G#4
    'h': 69,  // A4
    'u': 70,  // A#4
    'j': 71,  // B4
    'k': 72   // C5
};

// html oblects

var buttons_div = document.getElementById("choices")
var controls_div = document.getElementById("controls")
var key_div = document.getElementById("keyboard");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

/* function runned when the page is firstly loaded
 *  - loads the saved variables from the local storage
 *  - generates the correct html
 *  - loads the correct html for the chosen exercise
 *  
 */
/*
function onLoad() {
    // retrieving from local storage
    type = localStorage.getItem("type") // which exercise
    reps = localStorage.getItem("reps") // number of repetitions
    key = localStorage.getItem("key")   // which intervals/chords
    values = key.split("e")
    let text = ''
    switch(type){  // setts the correct control buttons
        case "11":
            dir = localStorage.getItem("dir") // gets the direction if it's melodic intervals
            text = 'type = '+type+'<br>dir = '+dir+'<br>reps = ' + reps +'<br>key = '+key +'<br> values: <br>' // control string to be removed
        case "12":
            controls_div.innerHTML = interval_controls
            break;
        case"21":
        case"22":
        case"23":
            controls_div.innerHTML = chord_controls
            break;
    }
    if (type != "11") { // control text to be removed
        text = 'type = '+type+'<br>reps = ' + reps +'<br>key = '+key +'<br> values: <br>'   
    }
    values.forEach( value => {
        text = text + value + '<br>'
    })
    head_div.innerHTML = text

    let but_text = ''
    values.forEach(value =>{    // "generates" the html for displaying the correct choices for the execise
        but_text = but_text + buttonHtml(value)
        
    })
    buttons_div.innerHTML = but_text
    oct_num.innerHTML = octave/12 - 1
    next();
}

function buttonHtml(code){ // function for the Html
    let text
    switch (type) {
        case "11":
        case "12":
            text = interval_text[code-1]
            break;
        case "21":
        case "22":
        case "23":
            text = chord_text[code-1]
            break;
        default:
            break;
    }
    return '<button id = "'+code+'" onclick = "  check_fun('+code+')" class = "choice_button">'+text+' </button>'
}

function check_fun(value) { // executed when chosing an option
    if(checked == 0){ 
       if(value == curr_val) {
            head_div.innerHTML = "correct"
        } else {
            head.innerHTML = "wrong"
        }
        checked = 1
    } else {
        play(value)
    }
}

// Function to play a note based on MIDI note number
function playNoteFromMIDI(midiNote) {
    // relate the value of the note to the same note in the octave specified by octave
    let true_note = (midiNote - octave)%12 + octave
    true_note = true_note < octave ? true_note+12 : true_note
    // Formula to convert MIDI note to frequency (Hz)
    const frequency = midiToFreq(true_note);

    // Use Web Audio API to play the note
    playFrequency(frequency);
}


function midiToFreq(midi){ // from midi to frequency
    let midi_n = Number(midi)
    let offset = midi_n - 69
    return 440*(Math.pow(2,offset/12))
}

function replay(){ // replays the same solution
    play(curr_val)
}

function play_root(){
    let root_f = [] 
    root_f.push(midiToFreq(root))
    harm_play(root_f)
}

//play a set of notes harmonically --- doesn't work

function harm_play(notes){
    let txt = ''
    for (let i = 0; i < notes.length; i++) {
        txt = txt + note_list[i] + " ";            
    }
    head_div.innerHTML = txt
    notes.forEach(note => {
        resumeAudioContext();  
        //head_div.innerHTML = note
        asyncTone(note)
        //playTone(note)
    })
}

// play a sequence of notes melodically --- doesn't work

function mel_play(notes){
    let duration = 0;
    notes.forEach(note => {
        resumeAudioContext();  
        //head_div.innerHTML = note
        //asyncTone(note)
        playTone(note)
    })
}


// functions that implements the exercise, used to play more notes together or one after the other, depending on the exercise number 
function play(val){
    let curr_code = ''
    if (type == "11") { // melodic intervals
        curr_code = val
        let second_note = 0;
        switch (dir) { // switch on the direction of the exercise
            case "up":
                second_note = root + Number(curr_code)
                break;
            case "down":
                second_note = root - Number(curr_code)
                break;
            case "both":
                let rnd = Math.random()*1000
                second_note = (rnd%2 == 0) ? root + Number(curr_code) : root - Number(curr_code)
                break;
            default:
                break;
        }
        note_list.push(midiToFreq(root))
        note_list.push(midiToFreq(second_note))
        mel_play(note_list)
        note_list = []
    } else if (type == "12") { // harmonic intervals
        curr_code = val
        let second_note = root + Number(curr_code)
        note_list.push(midiToFreq(root))
        note_list.push(midiToFreq(second_note))
        harm_play(note_list)
        note_list = []
    } else { // chords
        note_list.push(midiToFreq(root))
        curr_code = chord_codes[val-1]
        curr_code = curr_code.split(' ')
        //head_div.innerHTML = "code =  " + cur_code
        curr_code.forEach(code => {
            let oth = root + Number(code)
            note_list.push(midiToFreq(oth))
        })
        harm_play(note_list)
        note_list = []
    }
}

function seeResults() {
        head_div.innerHTML = "done"
        location.href = '/results'
}

// NICOLA'S CODE

// Web Audio API setup
let playTone = function(frequency) {
    console.log("No instrument selected. Cannot play note.");
};

// Function to play frequency with a gain node
function playFrequency(frequency, gainValue) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filterNode = audioCtx.createBiquadFilter(); // Create the low-pass filter

    filterNode.type = 'lowpass'; // Low-pass filter type
    filterNode.frequency.setValueAtTime(2000, audioCtx.currentTime); // Set cutoff frequency

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime); // Start at 0
    gainNode.gain.linearRampToValueAtTime(gainValue, audioCtx.currentTime + 0.01); // Fade-in
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.9); // Fade-out

    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);
}

// Updated playPianoTone function with gain control
function playPianoTone(frequency) {
    const fundamental = audioCtx.createOscillator();
    const harmonic1 = audioCtx.createOscillator(); // 2nd harmonic
    const harmonic2 = audioCtx.createOscillator(); // 3rd harmonic
    const gainNode = audioCtx.createGain();
    const filterNode = audioCtx.createBiquadFilter(); // Low-pass filter to soften the sound

    fundamental.type = 'sine';
    fundamental.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Fundamental frequency

    harmonic1.type = 'sine';
    harmonic1.frequency.setValueAtTime(frequency * 2, audioCtx.currentTime); // 2nd harmonic

    harmonic2.type = 'sine';
    harmonic2.frequency.setValueAtTime(frequency * 3, audioCtx.currentTime); // 3rd harmonic

    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(2000, audioCtx.currentTime); // Cutoff at 2000 Hz

    const now = audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0, now); // Start at 0
    gainNode.gain.linearRampToValueAtTime(volumes.piano, now + 0.01); // Quick attack to max volume
    gainNode.gain.linearRampToValueAtTime(volumes.piano * 0.7, now + 0.2); // Sustain
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.5); // Release

    fundamental.connect(filterNode);
    harmonic1.connect(filterNode);
    harmonic2.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    fundamental.start();
    harmonic1.start();
    harmonic2.start();
    fundamental.stop(now + 1.5);
    harmonic1.stop(now + 1.5);
    harmonic2.stop(now + 1.5);
}


function playGuitarTone(frequency) {
    const fundamental = audioCtx.createOscillator();
    const harmonic1 = audioCtx.createOscillator(); // 2nd harmonic
    const gainNode = audioCtx.createGain();
    const filterNode = audioCtx.createBiquadFilter(); // Low-pass filter to soften the sound

    // Configure oscillators
    fundamental.type = 'sawtooth'; // Use sawtooth for the fundamental
    fundamental.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Fundamental frequency

    harmonic1.type = 'sine'; // Use sine for the 2nd harmonic
    harmonic1.frequency.setValueAtTime(frequency * 2, audioCtx.currentTime); // 2nd harmonic frequency

    // Set up the gain node and filter
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime); // Start at 0
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.02); // Quick attack
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1); // Sustain
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.0); // Release

    // Low-pass filter to reduce high frequencies
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(2000, audioCtx.currentTime); // Set cutoff frequency

    // Connect oscillators and gain node
    fundamental.connect(filterNode);
    harmonic1.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Start oscillators
    const now = audioCtx.currentTime;
    fundamental.start(now);
    harmonic1.start(now);
    
    // Stop oscillators after 1 second
    fundamental.stop(now + 1);
    harmonic1.stop(now + 1);
}

// Updated playFrequency function to include gain value
function playSynthTone(frequency) {
    playFrequency(frequency, volumes.synth); // Use the synth volume
}

// Function triggered by buttons
function Piano() {
    head_div.innerHTML = "Playing Piano Tone";
    playTone = playPianoTone;  // Assign playTone to the Piano function
}

function Guitar() {
    head_div.innerHTML = "Playing Guitar Tone";
    playTone = playGuitarTone;  // Assign playTone to the Guitar function
}

function Synth() {
    head_div.innerHTML = "Playing Synth Tone";
    playTone = playSynthTone;  // Assign playTone to the Synth function
}

// Function to play a note based on MIDI note number
function playNoteFromMIDI(midiNote) {
    const frequency = midiToFreq(midiNote + octave); // Add the octave to the MIDI note
    console.log("Playing note: " + frequency + " Hz"); // Log the frequency for debugging
    playTone(frequency);  // Make sure playTone is called with the correct frequency
}

function midiToFreq(midi) {
    let midi_n = Number(midi);
    let offset = midi_n - 69; // Offset from MIDI note 69 (A4)
    return 440 * (Math.pow(2, offset / 12)); // Calculate the frequency
}
*/

// Ensure the audio context is resumed on user interaction (fix for Safari)

function resumeAudioContext() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
        console.log("Audio Context Resumed"); // Add this line to log resumption
    } else {
        console.log("Audio Context Already Running"); // Check if it’s running already
    }
}


async function file2Buffer(fname) {
    try {
       // Fetch the MP3 file
       const file = await fetch(fname);
       if (!file.ok) throw new Error(`Failed to fetch ${fname}`);

       // Read the file as an ArrayBuffer
       const arrayBuffer = await file.arrayBuffer();

       // Decode audio data
       const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

       // Access audio data as Float32Array for each channel
        audio_buffs.push(audioBuffer.getChannelData(0)); // Each channel is a Float32Array

       console.log(`Processed file: ${fname}`);
   } catch (error) {
       console.error('Error processing audio file:', error);
   }
}

async function midiToBuff(midi){
    var relative = (midi - 60)
    var oct_shift = Math.floor(relative/12)
    var idx = relative%12
    return [idx, oct_shift]
}

async function octaveShifter(buff, shift){
    if(shift == 0) return buff;
    let fftSize = 1024;
    let hopSize = 1024;
    const fft = new FFT(fftSize);
    if(buff.length%fftSize != 0) { // zero padding
        let i = buff.length%fftSize;
        while(i > 0){
            buff.push(0)
            i--;
        }
    }
    const numWindows = buff.length / hopSize;
    let out = [];
    
    for (let i = 0; i < numWindows; i++) {
        const start = i * hopSize;
        const end = start + fftSize;
        let segment = new Float32Array(fftSize);
        for (let j = 0; j < fftSize; j++) { 
            segment[j] = buff[start+j]        
        }

        // Perform FFT
        const spectrum = fft.createComplexArray()
        fft.transform(spectrum, segment)

        // Frequency shift by pitchFactor
        const shiftedSpectrum = fft.createComplexArray();
        const freqBins = fftSize / 2;
        for (let k = 0; k < freqBins; k++) {
             newBin = 2**shift * k;
            if (newBin < freqBins) {
                shiftedSpectrum[newBin * 2] = spectrum[k * 2];       // Real part
                shiftedSpectrum[newBin * 2 + 1] = spectrum[k * 2 + 1]; // Imaginary part
            }
        }

        // Inverse FFT
        const shiftedSignal = fft.createComplexArray();
        fft.inverseTransform(shiftedSignal, shiftedSpectrum);

        // Overlap-add to reconstruct the signal
        for (let j = 0; j < fftSize; j++) {
            const index = start + j;
            if (index < outputSignal.length) {
                out[start + j] += shiftedSignal[j * 2] / fftSize; // Real part
            }
        }
    }
    return out;
}

function playAudio(to_play) {
    if (to_play.length === 0) {
        console.error('No audio buffers loaded.');
        return;
    }
    // Play each buffer simultaneously
    to_play.forEach((buffer, index) => {
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        // Connect the source to the audio context destination (speakers)
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 50; // Set to a value greater than 1 for amplification
        source.connect(gainNode).connect(audioCtx.destination);

        // Start playback
        source.start();
        console.log(`Playing buffer ${index + 1}...`);
    });
    console.log('Playing audio...');
}

function playAudioInSuccession(to_play) {
    if (to_play.length === 0) {
        console.error('No audio buffers loaded.');
        return;
    }

    let startTime = audioCtx.currentTime; // Start scheduling from the current time

    to_play.forEach((buffer, index) => {
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;

        // Connect the source to the audio context destination (speakers)
        source.connect(audioCtx.destination);

        // Schedule playback
        source.start(startTime);
        console.log(`Scheduled buffer ${index + 1} at ${startTime}s`);

        // Update startTime for the next buffer
        startTime += buffer.duration + 0.5;
    });
}

async function playNoteFromMIDI(midi_arr, type){
    let idx_oct = []
    let shifted_buffs = []

    for (midi of midi_arr) {
        idx_oct.push(await midiToBuff(midi))
    }
    for ([idx, oct] of idx_oct) {
        shifted_buffs.push(await octaveShifter(audio_buffs[idx], oct))
    }
    
    if(type == 2) shifted_buffs = shifted_buffs.reverse()
    if(type != 3) playAudioInSuccession(shifted_buffs)           // change true for an exercise check when jorge is done
    else playAudio(shifted_buffs)
}

function getButtons(code){ // function for the Html
    let text
    switch (type) {
        case "0":
            text = interval_text[code-1]
            break;
        case "1":
            text = chord_text[code-1]
            break;
        default:
            text = "bosh"
            break;
    }
    return '<button id = "'+code+'" onclick = "  check_fun('+code+')" class = "choice_button">'+text+' </button>'
}

// BUTTON FUNCTIONS

function octaveUp() {
    octave += 1; // Increase octave
}

function octaveDown() {
    octave -= 1;
}

function hideKeyboard(){ // function to hide the keyboard
    is_keyboard = !is_keyboard;
    if(is_keyboard){
        if(!is_test){
            key_div.innerHTML = keyboard_html;
            key_div.style.display = 'initial';
        }
        else key_div.innerHTML = 'keyboard cannot be used during a test'
    } else {key_div.innerHTML = hide_btn;
        key_div.style.display = 'contents';
    }
}
/*
function next(){ // function that creates the next
    if (rep_index < reps){
        if (checked) {
            checked = 0
            note_list = []
            //head_div.innerHTML = "values =  " + values
            let idx = Math.floor(Math.random() * values.length)
            curr_val = values[idx]
            root = Math.floor(Math.random() * 32) + 50
            head_div.innerHTML = "post =  " + idx + " " + curr_val + " " + root
            play(curr_val)
            head_div.innerHTML = "rep_idx = " + rep_index
            rep_index++;
        }
    } else {
        seeResults()
    }
}
*/
// Event listener pair for keyboard keys
document.addEventListener('keydown', (event) => {
    resumeAudioContext(); // Resume audio context when a key is pressed
    const key = event.key.toLowerCase();
    
    if (!pressed_keys.includes(key)) {  // Check if key is not already pressed
        pressed_keys.push(key);
        const midiNote = keyToMidi[key] || null;
        if (midiNote) {
            let note_arr = []
            note_arr.push(midiNote + 12*octave)
            playNoteFromMIDI(note_arr);
        } else {
            console.log("No MIDI note found for key:", key);
        }
    }
});
dir
document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    const note = keyToMidi[key];

    if (note != undefined && pressed_keys.find(e => e == key)) {
        pressed_keys.splice(pressed_keys.indexOf(key), 1);
    }
});

async function init(items) {
    for (let i = 0; i < items.length; i++) {
        await file2Buffer(items[i])
        console.log(audio_buffs.length)
        console.log(audio_buffs[i])
    }

    cat = localStorage.getItem("category")
    key = localStorage.getItem("key")
    type = localStorage.getItem("type")
    test = localStorage.getItem("test")

    values = key.split('-')
    buttonHtml = ''
    values.forEach(val => {
        buttonHtml = buttonHtml + getButtons(val)
    });
}

init(file_names)



/*
const sampler = new Tone.Sampler({
    
    urls:{
        C2: "C2.mp3",
        "D#2": 'Ds2.mp3',
        "F#2": 'Fs2.mp3',
        A2: "A2.mp3",
    },
    
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/casio/"
    
}).toDestination();

Tone.loaded().then(()=>{
    sampler.triggerAttackRelease(["C4","E4","G4"],4);
});

*/