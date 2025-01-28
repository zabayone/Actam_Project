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

const pipesInterval = 10000; // Faster pipe generation
const pipeSpeed = 5; // Slower pipe movement for smaller octave

let audioContext, analyser, frequencyInterval, mediaStream;
let playerY = gameScreen.clientHeight / 2; // Initial position
let isPlaying = false;
let pipes = [];
let score = 0;

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
            console.log("Detected Frequency:", frequency);
            updatePlayerPosition(frequency);
        }

        frequencyInterval = setInterval(detectFrequency, 100);
    }).catch(error => {
        console.error("Microphone access error:", error);
    });
}

function resumeAudioContext() {
    if (!audioContext) {
        // Initialize AudioContext if it doesn't exist
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log("AudioContext resumed successfully.");
        }).catch((error) => {
            console.error("Failed to resume AudioContext:", error);
        });
    }
}

// Function to get the dominant frequency from FFT data
function getPitchFromData(dataArray) {
    const autoCorrelate = (data) => {
        const SIZE = data.length;
        const threshold = 0.1;
        let bestOffset = -1;
        let bestCorrelation = 0;
        let correlation;

        for (let offset = 50; offset < SIZE; offset++) {
            correlation = 0;
            for (let i = 0; i < SIZE - offset; i++) {
                correlation += data[i] * data[i + offset];
            }
            correlation = correlation / SIZE;
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

// Update player position based on detected frequency
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

    const noteIndex = frequencyToNote.indexOf(closestNote);
    const sectionHeight = gameScreen.clientHeight / frequencyToNote.length;
    playerY = sectionHeight * noteIndex + sectionHeight / 2;

    player.style.top = `${playerY}px`;
}

// Start game
function startGame() {
    isPlaying = true;
    score = 0;
    hideStartModal();
    setupBackground();
    player.style.top = `${playerY}px`;
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

    spawnPipe();
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
    pipes.forEach(pipe => pipe.remove());
    pipes = [];
    playerY = gameScreen.clientHeight / 2;
    player.style.top = `${playerY}px`;
    setupBackground();
    mediaStream.getTracks().forEach(track => track.stop());
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
    document.addEventListener('click', resumeAudioContext); // Resume audio on click
});

startButton.addEventListener('click', () => {
    startGame();
    resumeAudioContext(); // Ensure AudioContext resumes
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

