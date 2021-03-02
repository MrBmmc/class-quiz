const startButton = document.getElementById('start-btn')
const highScoreButton = document.getElementById('highscore-btn')
const highScoreContainer = document.getElementById('highScoreContainer')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answer1 = document.getElementById('a1')
const answer2 = document.getElementById('a2')
const answer3 = document.getElementById('a3')
const answer4 = document.getElementById('a4')
const hideHighScoreButton = document.getElementById('hideHighScore-btn')
var answerButton = document.querySelector('.answer')
var timerElement = document.querySelector(".timer-count");
var highscore = JSON.parse(localStorage.getItem("highscore")) || [];
var isWin = false;
var timerInterval;
var startQuiz
var questions = [
    new Question("Who invented JavaScript?",
        ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich", "John Mackenroe"],
        "Brendan Eich"),

    new Question("Which one of these is a JavaScript package manager?",
        ["Nodes.js", "TypeScript", "MERN", "NPM"], "NPM"),

    new Question("Which tool can you use to ensure code quality?",
        ["Angular", "jQuery", "RequireJS", "ESLint"], "ESLint")
];
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
let shuffledQuestions, currentQuestionIndex
let currentQuestion;
startButton.addEventListener('click', startQuiz)

function nextQuestion() {
    currentQuestion = shuffledQuestions.pop()
    if (currentQuestion) {
        questionElement.textContent = currentQuestion.text
        answer1.textContent = currentQuestion.choices[0]
        answer2.textContent = currentQuestion.choices[1]
        answer3.textContent = currentQuestion.choices[2]
        answer4.textContent = currentQuestion.choices[3]
    } else {
        endGame();
    }
}

function startQuiz() {
    console.log('Started');
    shuffledQuestions = [...questions.sort()];
    nextQuestion();
    secondsLeft = 60;
    startTimer();
}

answer1.addEventListener('click', setAnswers);
answer2.addEventListener('click', setAnswers);
answer3.addEventListener('click', setAnswers);
answer4.addEventListener('click', setAnswers);

function endGame() {
    clearInterval(timerInterval);
    const initials = prompt("Please insert initials");
    highscore.push({ initial: initials, score: secondsLeft });
    localStorage.setItem("highscore", JSON.stringify(highscore));
}
function setAnswers(event) {
    const selectButton = event.target;
    const isCorrectAnswer = selectButton.textContent === currentQuestion.answer;
    console.log(selectButton.textContent);
    console.log(currentQuestion.answer);
    if (isCorrectAnswer) {
        winGame();
    } else {
        wrongAnswer();
    }
}

function winGame() {
    nextQuestion();
}

function wrongAnswer() {
    secondsLeft -= 15;
}

var timerEl = document.querySelector(".time");
var secondsLeft = 60;

function startTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--;

        timerEl.textContent = secondsLeft;
        
        if (secondsLeft < 1) {

            clearInterval(timerInterval);
            secondsLeft = 0;
            endGame();
        }
    }, 1000);
}

highScoreButton.addEventListener('click', renderhighscore);

hideHighScoreButton.addEventListener('click', hidescore);

function hidescore() {
    questionContainerElement.style.display = "block";
    highScoreContainer.style.display = "none";
    hideHighScoreButton.style.display = "none";
    highScoreButton.style.display = "block";
}
function renderhighscore() {
    highScoreContainer.innerHTML = "";
    const scoresContainer = document.createElement("div");
    
    
    for (let i = 0; i< highscore.length; i++) {
        const initialSpan = document.createElement("span");
    const scoreSpan = document.createElement("span");
    initialSpan.textContent = highscore [i].initial;
    scoreSpan.textContent = highscore [i].score;
    const scoreContainer = document.createElement("div");
    scoreContainer.appendChild(initialSpan);
    scoreContainer.appendChild(scoreSpan);
    scoresContainer.appendChild(scoreContainer);
    }
    questionContainerElement.style.display = "none";
    highScoreContainer.style.display = "block";
    hideHighScoreButton.style.display = "block";
    highScoreButton.style.display = "none";
    highScoreContainer.appendChild(scoresContainer);
}

