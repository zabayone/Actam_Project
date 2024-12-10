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

const pipesInterval = 10000;
const pipeSpeed = 10;

let audioContext, analyser, frequencyInterval, mediaStream;
let playerY = gameScreen.clientHeight / 2; // Initial position
let isPlaying = false;
let pipes = [];
let score = 0;

const frequencyToNote = [
    ['C2', 65.41],  ['D2', 73.42], ['E2', 82.41], ['F2', 87.31], 
    ['G2', 98.00],  ['A2', 110.00], ['B2', 123.47],
    ['C3', 130.81], ['D3', 146.83], ['E3', 164.81], ['F3', 174.61],
    ['G3', 196.00], ['A3', 220.00], ['B3', 246.94],
    ['C4', 261.63], ['D4', 293.66], ['E4', 329.63]
];

function playRandomNote() {
    const semitonesFromA3 = Math.floor(Math.random() * 49) - 12;
    const frequency = 220 * Math.pow(2, semitonesFromA3 / 12);
    playPianoTone(frequency);
}

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
    existingNotes.forEach(note => note.remove()); // Remove all note sections

    frequencyToNote.forEach(([note]) => {
        const noteSection = document.createElement('div');
        noteSection.classList.add('noteSection');
        noteSection.textContent = note;
        gameScreen.appendChild(noteSection);
    });
}

// Initialize audio context
function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaStream = stream;
        const micInput = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        micInput.connect(analyser);

        const dataArray = new Float32Array(analyser.frequencyBinCount);

function detectFrequency() {
    analyser.getFloatTimeDomainData(dataArray);
        
    const frequency = getPitchFromData(dataArray);
    console.log("Detected Frequency:", frequency); // Log the detected frequency
        
        updatePlayerPosition(frequency);
}
        

        frequencyInterval = setInterval(detectFrequency, 100);
    }).catch(error => {
        console.error("Microphone access error:", error);
    });
}

// Function to get the dominant frequency from FFT data
function getPitchFromData(dataArray) {
    const autoCorrelate = (data) => {
        const SIZE = data.length;
        const threshold = 0.1; // Lower threshold for weaker signals
        let bestOffset = -1;
        let bestCorrelation = 0;
        let correlation;
    
        for (let offset = 50; offset < SIZE; offset++) { // Start from 50 to skip noise
            correlation = 0;
            for (let i = 0; i < SIZE - offset; i++) {
                correlation += data[i] * data[i + offset]; // Cross-correlation
            }
            correlation = correlation / SIZE; // Normalize
            if (correlation > bestCorrelation && correlation > threshold) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        }
    
        const sampleRate = audioContext.sampleRate;
        return bestOffset > 0 ? sampleRate / bestOffset : -1;
    };
    

    return autoCorrelate(dataArray);
}

function updatePlayerPosition(frequency) {
    if (frequency === -1) {
        console.log("No valid frequency detected");
        return;
    }

    let closestNote = frequencyToNote[0];
    for (let note of frequencyToNote) {
        if (Math.abs(note[1] - frequency) < Math.abs(closestNote[1] - frequency)) {
            closestNote = note;
        }
    }

    console.log("Closest Note:", closestNote[0], "Frequency:", closestNote[1]);

    const noteIndex = frequencyToNote.indexOf(closestNote);
    const sectionHeight = gameScreen.clientHeight / frequencyToNote.length;
    playerY = sectionHeight * noteIndex + sectionHeight / 2;

    console.log("Player New Y Position:", playerY);
    player.style.top = `${playerY}px`;
}
// Start game
function startGame() {
    isPlaying = true;
    score = 0;
    hideStartModal();
    setupBackground();
    player.style.top = `${playerY}px`; // Ensure the player starts at the correct position
    initAudio();
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
    const spawnPipe = () => {
        const gapIndex = Math.floor(Math.random() * frequencyToNote.length);
        const sectionHeight = gameScreen.clientHeight / frequencyToNote.length;
        const gapPosition = sectionHeight * gapIndex;

        const pipeTopHeight = gapPosition;
        const pipeBottomHeight = gameScreen.clientHeight - gapPosition - sectionHeight;

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

    // Spawn the first pipe immediately
    spawnPipe();

    // Spawn subsequent pipes at regular intervals
    setInterval(spawnPipe, pipesInterval);
}

// Move pipes
function movePipes() {
    pipes.forEach(pipe => {
        const left = parseInt(window.getComputedStyle(pipe).left, 10);
        if (left < -80) {
            pipe.remove();
            pipes.shift();
        } else {
            pipe.style.left = `${left - pipeSpeed}px`;
        }
    });
}

// Check collisions
function checkCollisions() {
    const playerBounds = player.getBoundingClientRect();
    for (let pipe of pipes) {
        const pipeBounds = pipe.getBoundingClientRect();
        if (
            playerBounds.left < pipeBounds.right &&
            playerBounds.right > pipeBounds.left &&
            playerBounds.top < pipeBounds.bottom &&
            playerBounds.bottom > pipeBounds.top
        ) {
            endGame();
        }
    }
}

// End game
function endGame() {
    isPlaying = false;
    clearInterval(frequencyInterval);
    mediaStream.getTracks().forEach(track => track.stop());
    showGameOverModal();
    finalScore.textContent = score;
}

// Restart game
function restartGame() {
    // Reset game state
    isPlaying = false;
    score = 0;

    // Clear all pipes
    pipes.forEach(pipe => pipe.remove());
    pipes = []; // Empty the pipes array

    // Reset the player position
    playerY = gameScreen.clientHeight / 2; // Set to initial position
    player.style.top = `${playerY}px`; // Update the player's position on screen

    // Reset background notes
    setupBackground(); // Re-add the notes to the background

    // Restart audio context (and any other required states)
    mediaStream.getTracks().forEach(track => track.stop()); // Stop microphone stream
    clearInterval(frequencyInterval); // Clear frequency detection

    // Show the start modal again
    showStartModal();
}

// Restart the game when the restart button is clicked
restartButton.addEventListener("click", () => {
    hideGameOverModal(); // Hide game over modal
    restartGame(); // Restart the game
});

// Show the start modal on load
window.addEventListener("DOMContentLoaded", () => {
    showStartModal();
});

// Start the game on button click
startButton.addEventListener('click', startGame);
