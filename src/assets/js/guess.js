let checked = 1
let correct = 0
let reps = 15
let note = 0
let rep_index = 0

let octave = 0

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let level_counter = document.getElementById("levelCounter");
let score_counter = document.getElementById("finalScore");

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


async function playRandomNote(){ // function that creates the next
    if (rep_index < reps){
        if (checked) {
            checked = 0
            midi_arr = []
            root = Math.floor(Math.random() * 32) + 50
            midi_arr.push(root)
            playNoteFromMIDI(midi_arr);
            rep_index = rep_index+1;
            note = root%12
            level_counter.textContent = `${rep_index} / ${reps}`;
        }
    } else {
        //exec at the end
        showGameOverModal();
        score_counter.textContent = `Score: ${correct} / ${reps}`;
    }
}

async function checkAndPlay(midi_arr){
    if(checked){
        let note_arr = []
        i = 0;
        for (midi of midi_arr) {
            note_arr.push(await midiToNote(midi))
        }
        Tone.loaded().then(()=>{
            sampler.triggerAttackRelease(note_arr, 1.2);
        });
    } else {
        if((midi_arr[0])%12 == note){
             console.log("correct");
             correct += 1
            } else 
            console.log("incorrect");
        checked = 1
    }
}

async function playNoteFromMIDI(midi_arr){
    let note_arr = []
    i = 0;
    for (midi of midi_arr) {
        note_arr.push(await midiToNote(midi))
    }
    Tone.loaded().then(()=>{
        sampler.triggerAttackRelease(note_arr, 1.2);
    });
}

async function midiToNote(midi){
    var relative = (midi - 60)
    var oct_shift = Math.floor(relative/12)
    while(relative < 0) relative += 12;
    var idx = relative%12
    var note = notes[idx] + (4+oct_shift).toString()
    return note
}

function adaptOctave(val){
    return val + 12*octave
}

function octaveUp() {
    octave += 1; // Increase octave
}

function octaveDown() {
    octave -= 1;
}

level_counter.textContent = `${rep_index} / ${reps}`;

// Show Game Over Modal
function showGameOverModal() {
    gameOverOverlay.classList.add("active");
    gameOverModal.classList.add("active");
}

// Hide Game Over Modal
function hideGameOverModal() {
    gameOverOverlay.classList.remove("active");
    gameOverModal.classList.remove("active");
}

function restartGame() {

    correct = 0;
    rep_index = 0;
    level_counter.textContent = `${rep_index} / ${reps}`;
    hideGameOverModal();
}
