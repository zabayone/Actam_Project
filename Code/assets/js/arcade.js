const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');
const obstacle = document.getElementById('obstacle');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const gameOverElement = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');

// Variables
let birdTop = window.innerHeight * 0.4; // Start at 40% of the viewport height
let birdVelocity = 0; // Initial velocity
let gravity = 0.25; // Gravitational acceleration
let jumpStrength = -7; // Jump impulse
let isGameOver = false;
let score = 0;
let lives = 3; // Number of lives
let invulnerable = false; // Invulnerability state
let scrcount = 0;
const invulnerabilityDuration = 2000; // Duration in milliseconds
let gameInterval;
const obstacles = []; // Store multiple obstacles
const obstacleCount = 3; // Number of obstacles on screen
const obstacleSpacing = window.innerWidth / obstacleCount; // Spacing between obstacles



// Initialize the game
function startGame() {
    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump); // Support for touch
    createObstacles(); // Generate initial obstacles
    updateLives(); // Display initial lives
    updateScore(); // Display initial score

    // Center the bird horizontally
    bird.style.left = `${window.innerWidth / 2 - bird.clientWidth / 2}px`;

    // Start game loop
    gameInterval = setInterval(gameLoop, 20);
}

// Main game loop
function gameLoop() {
    if (isGameOver) return;

    // Update bird position with gravity
    birdVelocity += gravity;
    birdTop += birdVelocity;

    // Keep the bird within screen bounds
    birdTop = Math.max(0, Math.min(birdTop, window.innerHeight - bird.clientHeight));
    bird.style.top = birdTop + 'px';

    // Rotate the bird based on velocity
    bird.style.transform = birdVelocity < 0 ? 'rotate(-20deg)' : 'rotate(20deg)';

    // Update obstacles
    obstacles.forEach(obstacle => {
        obstacle.left -= 5;
        if (obstacle.left < -obstacle.offsetLeft) {
            obstacle.left = window.innerWidth;
            obstacle.gapPosition = Math.random() * (window.innerHeight - obstacle.gapHeight);
            score++;
            updateScore();
            scrcount++;
            if (scrcount == 10 && lives < 10) {
                lives++;
                updateLives();
                scrcount = 0;
            }
        }

        // Update obstacle positions
        updateObstacle(obstacle);

        // Check collisions if not invulnerable
        if (
            !invulnerable &&
            checkCollision(bird, obstacle.elementBottom, obstacle.elementTop)
        ) {
            lives--;
            updateLives();
            if (lives > 0) {
                resetBird();
                startInvulnerability();
            } else {
                gameOver();
            }
        }
    });
}

function jump(event) {
    if (event.code === 'Space' || event.type === 'touchstart') {
        birdVelocity = jumpStrength; // Jump impulse
        bird.style.transform = 'rotate(-20deg)'; // Immediate upward rotation
    }
}

// Collision detection
function checkCollision(bird, bottomObstacle, topObstacle) {
    const birdRect = bird.getBoundingClientRect();
    const bottomRect = bottomObstacle.getBoundingClientRect();
    const topRect = topObstacle.getBoundingClientRect();

    return (
        (birdRect.right > bottomRect.left &&
            birdRect.left < bottomRect.right &&
            birdRect.bottom > bottomRect.top) ||
        (birdRect.right > topRect.left &&
            birdRect.left < topRect.right &&
            birdRect.top < topRect.bottom)
    );
}

function resetBird() {
    birdTop = window.innerHeight * 0.4; // Reset bird to safe position
    bird.style.top = birdTop + 'px';
}

function startInvulnerability() {
    invulnerable = true;
    setTimeout(() => {
        invulnerable = false;
    }, invulnerabilityDuration);
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval);
    gameOverElement.style.display = 'block'; // Show game over screen
}

function restartGame() {
    // Reset variables and elements
    isGameOver = false;
    lives = 3;
    score = 0;
    birdTop = window.innerHeight * 0.4;
    invulnerable = false;
    gameOverElement.style.display = 'none';

    // Remove listeners and restart game
    document.removeEventListener('keydown', jump);
    document.removeEventListener('touchstart', jump);
    clearInterval(gameInterval);
    resetObstacles();
    startGame();
}

function updateLives() {
    livesElement.innerHTML = `Lives: ${lives}`;
}

function updateScore() {
    scoreElement.innerHTML = `Score: ${score}`;
}

// Obstacle management
function createObstacles() {
    for (let i = 0; i < obstacleCount; i++) {
        let obstacle = createObstacle(i * obstacleSpacing);
        obstacles.push(obstacle);
    }
}

function createObstacle(initialLeft) {
    const gapHeight = window.innerHeight * 0.25; // 25% of screen height
    const gapPosition = Math.random() * (window.innerHeight - gapHeight); // Random gap position

    const obstacleBottom = document.createElement('div');
    obstacleBottom.className = 'obstacleBot';
    gameContainer.appendChild(obstacleBottom);

    const obstacleTop = document.createElement('div');
    obstacleTop.className = 'obstacleTop';
    gameContainer.appendChild(obstacleTop);

    return {
        elementBottom: obstacleBottom,
        elementTop: obstacleTop,
        gapHeight: gapHeight,
        gapPosition: gapPosition,
        left: initialLeft,
    };
}

function updateObstacle(obstacle) {
    obstacle.elementBottom.style.left = obstacle.left + 'px';
    obstacle.elementBottom.style.height =
        window.innerHeight - (obstacle.gapPosition + obstacle.gapHeight) + 'px';

    obstacle.elementTop.style.left = obstacle.left + 'px';
    obstacle.elementTop.style.height = obstacle.gapPosition + 'px';
}

function resetObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.left = window.innerWidth;
        updateObstacle(obstacle);
    });
}

// Handle window resizing to adjust game layout
window.addEventListener('resize', () => {
    bird.style.left = `${window.innerWidth / 2 - bird.clientWidth / 2}px`;
    birdTop = Math.min(birdTop, window.innerHeight - bird.clientHeight);
    resetObstacles();
});

// Prevent accidental scrolling on touch devices
document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, { passive: false });

// Center the bird vertically
bird.style.top = `${window.innerHeight * 0.4}px`;

// Start the game
startGame();
