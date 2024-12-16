const questions = [

    { question: "What is the fifth note of the C major scale?", options: ["A", "G", "E", "F"], answer: "G" },
    { question: "How many sharps are in the key of E major?", options: ["2", "3", "4", "5"], answer: "4" },
    { question: "What is the relative minor of C major?", options: ["A minor", "E minor", "D minor", "G minor"], answer: "A minor" },
    { question: "Which note is a perfect fifth above G?", options: ["C", "D", "E", "B"], answer: "D" },
    { question: "How many flats are in the key of A flat major?", options: ["4", "3", "5", "2"], answer: "4" },
    { question: "What is the third note of the G major scale?", options: ["A", "B", "C", "D"], answer: "B" },
    { question: "What is the interval between C and G?", options: ["Perfect fourth", "Perfect fifth", "Major sixth", "Minor sixth"], answer: "Perfect fifth" },
    { question: "Which chord is built on the seventh degree of a major scale?", options: ["Major", "Diminished", "Minor", "Augmented"], answer: "Diminished" },
    { question: "What is the enharmonic equivalent of F#?", options: ["G", "E#", "Gb", "F"], answer: "Gb" },
    { question: "What is the key signature of D major?", options: ["1 sharp", "2 sharps", "3 sharps", "4 sharps"], answer: "2 sharps" },
    { question: "What is the sixth degree of the A major scale?", options: ["F#", "D", "E", "C#"], answer: "F#" },
    { question: "Which scale has the notes C, D, E, F, G, A, B, C?", options: ["C major", "G major", "F major", "D major"], answer: "C major" },
    { question: "How many beats are in a 6/8 time signature?", options: ["6 beats", "2 beats", "3 beats", "4 beats"], answer: "2 beats" },
    { question: "What is the dominant chord in the key of G major?", options: ["G", "A", "D", "C"], answer: "D" },
    { question: "What is the tempo marking for 'slow and broad'?", options: ["Largo", "Andante", "Presto", "Adagio"], answer: "Largo" },
    { question: "What is the name of the interval between E and G?", options: ["Major third", "Minor third", "Perfect fifth", "Perfect fourth"], answer: "Minor third" },
    { question: "What is the relative major of D minor?", options: ["A major", "C major", "F major", "G major"], answer: "F major" },
    { question: "Which note is the leading tone in the key of A major?", options: ["B", "G#", "F#", "C#"], answer: "G#" },
    { question: "What is the interval between F and B?", options: ["Perfect fourth", "Augmented fourth", "Perfect fifth", "Major sixth"], answer: "Augmented fourth" },
    { question: "How many semitones are in a perfect fifth?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "Which scale degree is known as the tonic?", options: ["1st", "3rd", "5th", "7th"], answer: "1st" },
    { question: "What is the name of the interval between G and E?", options: ["Major sixth", "Minor sixth", "Perfect fifth", "Perfect fourth"], answer: "Major sixth" },
    { question: "What does a dot after a note indicate?", options: ["Increase note value by half", "Shorten note value by half", "Play louder", "Play softer"], answer: "Increase note value by half" },
    { question: "What is the fourth degree of the F major scale?", options: ["A", "Bb", "C", "G"], answer: "Bb" },
    { question: "Which key has three flats in its key signature?", options: ["Ab major", "Eb major", "C minor", "Bb minor"], answer: "Eb major" },
    { question: "What is the subdominant chord in the key of C major?", options: ["F major", "G major", "A minor", "E minor"], answer: "F major" },
    { question: "Which scale has the notes G, A, Bb, C, D, Eb, F, G?", options: ["G major", "G minor", "G melodic minor", "G harmonic minor"], answer: "G minor" },
    { question: "What does 'crescendo' mean?", options: ["Gradually get louder", "Gradually get softer", "Play smoothly", "Play detached"], answer: "Gradually get louder" },
    { question: "What is the name of the key with one sharp?", options: ["C major", "G major", "D major", "A major"], answer: "G major" },
    { question: "How many whole steps are in an octave?", options: ["6", "7", "8", "5"], answer: "6" },
    { question: "Which chord is the mediant in the key of E major?", options: ["G#m", "C#m", "F#m", "B"], answer: "G#m" },
    { question: "What is the term for playing notes smoothly and connected?", options: ["Staccato", "Legato", "Marcato", "Tenuto"], answer: "Legato" }
];


let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
let shuffledQuestions = []; 

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const timeDisplay = document.getElementById('time-left');
const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const scoreDisplay = document.getElementById('score');

document.getElementById('start-button').addEventListener('click', startQuiz);
document.getElementById('restart-button').addEventListener('click', () => location.reload());


function startQuiz() {
    // Shuffle questions at the beginning
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestion = 0; // Reset question index
    score = 0; // Reset score
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    timer = setInterval(updateTimer, 1000);
    loadQuestion();
}

function updateTimer() {
    timeLeft--;
    if (timeLeft <= 0) {
        endQuiz();
        return;
    }
    const timerElement = document.getElementById('time-left');
    timerElement.textContent = timeLeft;
}

function loadQuestion() {
    if (currentQuestion >= shuffledQuestions.length) {
        endQuiz();
        return;
    }

    const q = shuffledQuestions[currentQuestion];
    questionContainer.textContent = q.question;
    optionsContainer.innerHTML = '';

    q.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.id = "option";
        li.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(li);
    });
}

function checkAnswer(selected) {
    const options = Array.from(optionsContainer.children); // Get all option buttons
    
    // Check the selected answer
    if (selected === questions[currentQuestion].answer) {
        // Correct answer clicked
        options.forEach(option => {
            if (option.textContent === selected) {
                option.style.background = '#00b164'; // Green for correct
            }
        });
    } else {
        // Incorrect answer clicked
        options.forEach(option => {
            if (option.textContent === selected) {
                option.style.background = '#d51515'; // Red for wrong selection
            }
            if (option.textContent === questions[currentQuestion].answer) {
                option.style.background = '#00b164'; // Green for correct answer
            }
        });
    }
    
    // Wait for 1 second before moving to the next question
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1000);
}

    // Delay moving to the next question to give time for color feedback
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1000); // 1-second delay
}

  function endQuiz() {
  clearInterval(timer);
    quizScreen.style.display = 'none';
    endScreen.style.display = 'block';
    scoreDisplay.textContent = "Your score: " + score;
  }
  