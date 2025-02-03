// Game variables
const gameScreen = document.getElementById('gameScreen');
const player = document.getElementById('player');
const startButton = document.getElementById('startButton');
const startOverlay = document.getElementById('startOverlay');
const startModal = document.getElementById('startModal');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const gameOverModal = document.getElementById('gameOverModal');
const finalScore = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');

const pipesInterval = 4000; // Faster pipe generation
let pipeSpeed = 15; // Slower pipe movement for smaller octave

let audioContext, frequencyInterval;
let playerY = gameScreen.clientHeight / 2; // Initial position
let isPlaying = false;
let pipes = [];
let score = 0;

document.addEventListener('gameEnd', (event) => {
    console.log("GameEnd recibido!", event.detail);
    // Aquí podemos acceder a event.detail.score
});


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




// Single octave notes with sharps and flats
const frequencyToNote = [
    ['C4', 261.63], ['C#4', 277.18], ['D4', 293.66], ['D#4', 311.13], 
    ['E4', 329.63], ['F4', 349.23], ['F#4', 369.99], ['G4', 392.00], 
    ['G#4', 415.30], ['A4', 440.00], ['A#4', 466.16], ['B4', 493.88]
];

// Show Start Modal
function showStartModal() {
    startOverlay.classList.add("active");
    startModal.classList.add("active");
}

// Hide Start Modal
function hideStartModal() {
    startOverlay.classList.remove("active");
    startModal.classList.remove("active");
}

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

// Add note labels to background
function setupBackground() {
    // Remove existing note sections if they already exist
    const existingNotes = document.querySelectorAll('.noteSection');
    existingNotes.forEach(note => note.remove());

    // Add new note sections for single octave
    noteStrings.slice().reverse().forEach(note => {
        const noteSection = document.createElement('div');
        noteSection.classList.add('noteSection');
        noteSection.textContent = note;
        gameScreen.appendChild(noteSection);
    });
}


function startPitchTrack(){
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    for(let i=0;i<MAX_LENGTH;i++){
        last_values[i]=440;
    }
    getPitch();

}

function getPitch(){
    analyser.getFloatTimeDomainData(buffer);
    let frequencyInHz = autoCorrelate(buffer, audioContext.sampleRate);
    //console.log(frequencyInHz);

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
            note =midiNote%12; 
            
            detune = centsOffFromPitch(averageFreq,midiNote);
            position = note+detune/100;
            updatePlayerPosition(position);
        }
    }

    rafID =window.requestAnimationFrame(getPitch);
}

// Update player position based on detected frequency
function updatePlayerPosition(note) {

    const sectionHeight = gameScreen.clientHeight;
    if (note<0){note+= 12}
    if(note>12){note+= -12}

    playerY = sectionHeight*(12-note)/12;
    console.log(playerY + " / " +note);

    player.style.top = `${playerY}px`;
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

// Start game
function startGame() {
    isPlaying = true;
    score = 0;
    hideStartModal();
    setupBackground();
    getMicrophoneStream();
    spawnPipes();
    gameLoop();
}

// Game loop
function gameLoop() {
    if (!isPlaying) return;
    movePipes();
    checkCollisions();
    requestAnimationFrame(gameLoop);
}

// Pipes spawner
function spawnPipes() {
    let gapSize=gameScreen.clientHeight / noteStrings.length*3;
    const spawnPipe = () => {
        const gapIndex = Math.floor(Math.random() * (noteStrings.length-gapSize*noteStrings.length/gameScreen.clientHeight+1));
        const sectionHeight = gameScreen.clientHeight / noteStrings.length;
        const gapPosition = sectionHeight * gapIndex;
 
        
        const pipeTopHeight = gapPosition;
        const pipeBottomHeight = gameScreen.clientHeight - gapPosition - gapSize;
        if(gapSize>1){
            gapSize=gapSize*0.93;
            pipeSped=pipeSpeed*1.03;
        }
        else{
            pipeSpeed=pipeSpeed*1.1;
        }

        const pipeTop = document.createElement('div');
        pipeTop.classList.add('pipe', 'top');
        pipeTop.style.height = `${pipeTopHeight}px`;
        pipeTop.style.left = '100vw';
        gameScreen.appendChild(pipeTop);

        const pipeBottom = document.createElement('div');
        pipeBottom.classList.add('pipe', 'bottom');
        pipeBottom.style.height = `${pipeBottomHeight}px`;
        pipeBottom.style.left = '100vw';
        gameScreen.appendChild(pipeBottom);

        pipes.push(pipeTop, pipeBottom);
    };

    spawnPipe();
    spawnInterval=setInterval(spawnPipe, pipesInterval);
}

// Move pipes
function movePipes() {
    // Iterar de dos en dos, empezando desde el final
    for(let i = pipes.length - 2; i >= 0; i -= 2) {
        const pipeTop = pipes[i];
        const pipeBottom = pipes[i + 1];
        
        // Verificar que ambas tuberías existen
        if (!pipeTop || !pipeBottom) continue;
        
        const leftTop = parseInt(window.getComputedStyle(pipeTop).left, 10);
        const leftBottom = parseInt(window.getComputedStyle(pipeBottom).left, 10);
        
        if (leftTop < -80) {
            // Eliminar ambas tuberías juntas
            score++;
            pipeTop.remove();
            pipeBottom.remove();
            pipes.splice(i, 2); // Eliminar ambos elementos del array
        } else {
            pipeTop.style.left = `${leftTop - pipeSpeed}px`;
            pipeBottom.style.left = `${leftBottom - pipeSpeed}px`;
        }
    }
}

function checkCollisions() {
    const playerBounds = player.getBoundingClientRect();
    
    const adjustedPlayer = {
        top: playerBounds.top + (playerBounds.height * 0.05),
        bottom: playerBounds.bottom - (playerBounds.height * 0.7),
        left: playerBounds.left + (playerBounds.width * 0.05),
        right: playerBounds.right - (playerBounds.width * 0.05)
    };

    // Asegurarnos de procesar las tuberías en pares
    for (let i = 0; i < pipes.length - 1; i += 2) {
        const pipeTop = pipes[i];
        const pipeBottom = pipes[i + 1];
        
        // Verificación de seguridad
        if (!pipeTop?.parentNode || !pipeBottom?.parentNode) {
            continue;
        }
        
        try {
            const topBounds = pipeTop.getBoundingClientRect();
            const bottomBounds = pipeBottom.getBoundingClientRect();

            if (
                adjustedPlayer.left < topBounds.right &&
                adjustedPlayer.right > topBounds.left &&
                (
                    adjustedPlayer.top < topBounds.bottom ||
                    adjustedPlayer.bottom > bottomBounds.top
                )
            ) {
                stopMicrophoneStream(); 
                clearInterval(spawnInterval);
                endGame(); 
                return;
            }
        } catch (error) {
            console.error('Error en la comprobación de colisiones:', error);
            continue;
        }
    }
}

function showAdjustedHitbox(adjustedPlayer) {
    const oldHitbox = document.getElementById('debug-hitbox');
    if (oldHitbox) oldHitbox.remove();

    const hitbox = document.createElement('div');
    hitbox.id = 'debug-hitbox';
    hitbox.style.position = 'absolute';
    hitbox.style.border = '2px solid red';
    hitbox.style.top = adjustedPlayer.top + 'px';
    hitbox.style.left = adjustedPlayer.left + 'px';
    hitbox.style.width = (adjustedPlayer.right - adjustedPlayer.left) + 'px';
    hitbox.style.height = (adjustedPlayer.bottom - adjustedPlayer.top) + 'px';
    hitbox.style.pointerEvents = 'none';
    hitbox.style.zIndex = '9999';
    document.body.appendChild(hitbox);
}



// End game
function endGame() {
    isPlaying = false;
    clearInterval(frequencyInterval);
    showGameOverModal();
    finalScore.textContent = score;

    console.log("Enviando evento gameEnd...");
    
    const gameEndEvent = new CustomEvent('gameEnd', { 
        detail: { score: score }
    });
    document.dispatchEvent(gameEndEvent);
    
    // También enviamos test para verificar
    document.dispatchEvent(new Event('test'));
}

// Restart game
function restartGame() {
    // Eliminar la tabla de leaderboard si existe
    const leaderboard = document.getElementById('leaderboard-container');
    if (leaderboard) {
        leaderboard.remove();
    }

    pipes.forEach(pipe => pipe.remove());
    pipes = [];
    playerY = gameScreen.clientHeight / 2;
    player.style.top = `${playerY}px`;
    setupBackground();
    clearInterval(frequencyInterval);
    showStartModal();
}

// Event Listeners
restartButton.addEventListener("click", () => {
    hideGameOverModal();
    restartGame();
});

window.addEventListener("DOMContentLoaded", () => {
    showStartModal();
    //document.addEventListener('click', resumeAudioContext); // Resume audio on click
});


startButton.addEventListener('click', () => {
    startGame();
});

document.addEventListener('click', () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log("AudioContext resumed after user gesture");
        });
    }
});

function goHome() {
    document.location.href = '/'
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

