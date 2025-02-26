let checked = 1
let correct = 0
let reps = 15
let note = 0
let rep_index = 0

let octave = 0

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let level_counter = document.getElementById("levelCounter");
let score_counter = document.getElementById("finalScore");
let score_Container = document.getElementById("scoreContainer");



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
        
        //console.log("Enviando evento gameEnd...");
        const gameEndEvent = new CustomEvent('gameEnd', { 
            detail: { score: correct }
        });
        document.dispatchEvent(gameEndEvent);
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
            //console.log("correct");
            correct += 1
            //color the corresponding ball green
            let scoreBall = document.querySelectorAll(".scoreBall")[rep_index - 1];
            scoreBall.style.backgroundColor = "green";
        } else {
            //console.log("incorrect");
            //color the corresponding ball red
            let scoreBall = document.querySelectorAll(".scoreBall")[rep_index - 1];
            scoreBall.style.backgroundColor = "red";
        }
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
    const leaderboard = document.getElementById('leaderboard-container');
    if (leaderboard) {
        leaderboard.remove();
    }
    hideGameOverModal();
    clearScoreBalls();
    GenerateScoreBalls();
}

function GenerateScoreBalls() {
    for (let i = 0; i < reps; i++) {
        let scoreBall = document.createElement("div");
        scoreBall.classList.add("scoreBall");
        score_Container.appendChild(scoreBall);
    }
}

function clearScoreBalls() {
    let scoreBalls = document.querySelectorAll(".scoreBall");
    scoreBalls.forEach((scoreBall) => {
        scoreBall.remove();
    });
}

const littleGuy=document.getElementById('boton');
let active=false;


function showMessage(){
    let cat = localStorage.getItem("category");
    let level = localStorage.getItem("level");
    const container =document.getElementById("tutorial");
    container.style.display="block"
    container.innerHTML = `
    <p>¡Try to guess the given note!</p>
    <p>You can use the keyboard to get a reference</p> 
    <p>Once you hit play a note will sound</p> 
    <p>The next key you press after play is your guess</p> 
    <p>After guessing you can freely use the keyboard again until you press play</p> 
`

}

littleGuy.addEventListener('click', () => {
    // Remove the 'active' class from all elements
    if(active){
        document.getElementById("tutorial").innerHTML='';
        tutorial.style.display='none';
    }else{
        showMessage();
    }
    active = !active
});

GenerateScoreBalls();
