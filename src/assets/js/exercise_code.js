// global variables
var cat
var test

// Running state
var is_keyboard = 1
var is_test = 0
var root = 0            // MIDI of the root note
var values; // array of the indexes of the active exercises 
var types; // array of the indexes of the active exercises 
var reps = 3
var rep_index = 0;
var checked = 1;
var midi_arr = [];
let chosen_type = -1;
var storage;
var day;

var curr_val
var curr_idx

var pressed_keys = [];  // Array used to store the pressed keys in order to avoid multiple presses if held
var octave = 0          // Octave shift for the keyboard

let num_stored = 0

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
var level_description = document.getElementById("levelDescription")
var level_counter = document.getElementById("levelCounter")
var buttons_div = document.getElementById("choices")
var controls_div = document.getElementById("controls")
var key_div = document.getElementById("keyboard");

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

level_counter.textContent = `${rep_index} / ${reps}`;


// Ensure the audio context is resumed on user interaction (fix for Safari)
function resumeAudioContext() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
        console.log("Audio Context Resumed"); // Add this line to log resumption
    } else {
        console.log("Audio Context Already Running"); // Check if it’s running already
    }
}

async function midiToNote(midi){
    var relative = (midi - 60)
    var oct_shift = Math.floor(relative/12)
    while(relative < 0) relative += 12;
    var idx = relative%12
    var note = notes[idx] + (4+oct_shift).toString()
    return note
}

async function playNoteFromMIDI(midi_arr, type){
    let note_arr = []
    i = 0;
    for (midi of midi_arr) {
        note_arr.push(await midiToNote(midi))
    }
    if(type == 2) {
        Tone.loaded().then(()=>{
            sampler.triggerAttackRelease(note_arr, 1.2);
        });
    } else {
        let now = Tone.now(); // Start scheduling from the current time
            Tone.loaded().then(()=>{
                for(note of note_arr){
                    console.log(note)
                    sampler.triggerAttackRelease([note], 1, now + i);
                    i = i+1;
                }
            });
        }
}

function getButtons(code){ // function for the Html
    let text
    switch (cat) {
        case "0":
            text = interval_text[code]
            break;
        case "1":
            text = chord_text[code]
            break;
        default:
            text = "bosh"
            break;
    }
    return '<button id = "check_btn_'+code+'" onclick = "  checkButton('+code+')" class = "exercise_button">'+text+' </button>'
}

// BUTTON FUNCTIONS

function octaveUp() {
    octave += 1; // Increase octave
}

function octaveDown() {
    octave -= 1;
}

function adaptOctave(val){
    return val + 12*octave
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

async function next(){ // function that creates the next
    if (rep_index < reps){
        if (checked) {
            checked = 0
            values.forEach(valhalla => {
                let butt1 = "check_btn_"+valhalla
                document.getElementById(butt1).style.background = '#008080'
            })
            midi_arr = []
            let idx = Math.floor(Math.random() * values.length)
            curr_val = values[idx]
            curr_idx = idx
            root = Math.floor(Math.random() * 32) + 50
            let ones = []
            for (let i = 0; i < types.length; i++) {
                if(parseInt(types[i])){
                    ones.push(i)
                }
                
            }
            let idx_2 = Math.floor(Math.random() * ones.length)
            chosen_type = ones[idx_2]
            switch (parseInt(cat)) {
                case 0:
                    addNotes([root])
                    console.log("case 0 for cat:")
                    midi_arr.push(root)
                    let adder = parseInt(curr_val) + 1
                    if(chosen_type == 1) adder = -adder;
                    midi_arr.push(root + adder)
                break;
                case 1:
                    addNotes(null)                    
                    console.log("case 1 for cat:")
                    let curr_arr = chord_codes[curr_val].split(' ');
                    midi_arr.push(root)
                    for (const note of curr_arr) {
                        if(note) midi_arr.push(root + parseInt(note))
                    }
                    if(chosen_type == 1){
                        midi_arr.reverse()
                    }
                default:
                break;
            }
            console.log(midi_arr)
            
            console.log("chosen type: " + chosen_type)
            playNoteFromMIDI(midi_arr, chosen_type);
            rep_index = rep_index+1;
            level_counter.textContent = `${rep_index} / ${reps}`;
        }
    } else {
        seeResults()
    }
}

function playRoot(){
    let to_play = [root]
    playNoteFromMIDI(to_play, 2);
}

function playAgain(){
    playNoteFromMIDI(midi_arr, chosen_type);
}

function checkButton(val){
    if(checked == 0){
        console.log("checking")
        addNotes(midi_arr)
        checked = 1
        if(val == curr_val){
            storage.setCorrect(chosen_type,curr_idx)
            storage.printArray()
            console.log("correct")
            let butt1 = "check_btn_"+val
            document.getElementById(butt1).style.background = '#08c43a'
        } else {
            storage.setIncorrect(chosen_type,curr_idx)
            storage.printArray()
            let butt1 = "check_btn_"+val
            let butt2 = "check_btn_"+curr_val
            document.getElementById(butt1).style.background = '#d91507'
            document.getElementById(butt2).style.background = '#08c43a'
            console.log("wrongs")
        }
    } else {
        let midi_buff = []
        switch (parseInt(cat)) {
            case 0:
                console.log("case 0 for cat:")
                midi_buff.push(root)
                let adder = parseInt(val) + 1
                if(chosen_type == 1) adder = -adder;
                midi_buff.push(root + adder)
            break;
            case 1:                    
                console.log("case 1 for cat:")
                let curr_arr = chord_codes[val].split(' ');
                midi_buff.push(root)
                for (const note of curr_arr) {
                    if(note) midi_buff.push(root + parseInt(note))
                }
                if(chosen_type == 1){
                    midi_buff.reverse()
                }
            default:
            break;
        }
        playNoteFromMIDI(midi_buff,chosen_type)
    }
}

function seeResults(){
    storage.localStore()
    day.addExercise(storage)
    document.location.href = '/ear-training/results.html'
}

function storeData(){
    storage.localStore()
}
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

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    const note = keyToMidi[key];

    if (note != undefined && pressed_keys.find(e => e == key)) {
        pressed_keys.splice(pressed_keys.indexOf(key), 1);
    }
});

function saveAndGoHome(){
    storage.localStore() 
    day.addExercise(storage)
    document.location.href = '/'
}

async function init() {
    cat = localStorage.getItem("category")
    let key = localStorage.getItem("key")
    let type = localStorage.getItem("type")
    test = localStorage.getItem("test")

    console.log(cat, key, type, test)

    level_description.textContent = `Level ${localStorage.getItem("level")}`;

    butt_div = document.getElementById("ex_btn_container")

    values = key.split('-')
    types = type.split('-')
    buttonHtml = ''
    storage = new ExerciseContainer(values.length, null)
    day = new DayContainer(null)

    values.forEach(val => {
        buttonHtml = buttonHtml + getButtons(val)
    });
    butt_div.innerHTML = buttonHtml

    if(test == 1) {
        key_div.style.display = 'contents'
        key_div.innerHTML = ''
    }
    next()
}

init()
