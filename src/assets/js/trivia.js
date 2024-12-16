const questions = [
    { question: "What is the fifth note of the C major scale?", options: ["A", "G", "E", "F"], answer: "G" },
    { question: "How many sharps are in the key of E major?", options: ["2", "3", "4", "5"], answer: "4" },
    // Add more questions here...
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

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
    if (currentQuestion >= questions.length) {
      endQuiz();
      return;
    }
  
    const q = questions[currentQuestion];
    questionContainer.textContent = q.question;
    optionsContainer.innerHTML = '';
    
    q.options.forEach(option => {
      const li = document.createElement('li');
      li.textContent = option;
      li.addEventListener('click', () => checkAnswer(option));
      optionsContainer.appendChild(li);
    });
  }
  
function checkAnswer(selected) {
    if (selected === questions[currentQuestion].answer) {
        score++;
        optionsContainer.style.background="#00b164"
    }
    else{
        optionsContainer.style.background="#d51515"
    }
    currentQuestion++;
    loadQuestion();
}

  function endQuiz() {
  clearInterval(timer);
    quizScreen.style.display = 'none';
    endScreen.style.display = 'block';
    scoreDisplay.textContent = score;
  }
  