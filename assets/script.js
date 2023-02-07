const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz");
const timerDisplay = document.getElementById("timer");
const finalScoreContainer = document.getElementById("final-score-container");
const finalScoreDisplay = document.getElementById("final-score");
const initialsForm = document.getElementById("initials-form");

const questions = [
    {
        question: "What is JavaScript?",
        answers: [
            { text: "A programming language", correct: true },
            { text: "A web browser", correct: false },
            { text: "A search engine", correct: false }
        ]
    },

    {
        question: "What is the purpose of using JavaScript?",
        answers: [
            { text: "For styling web pages", correct: false },
            { text: "For adding interactivity to web pages", correct: true },
            { text: "For creating and modifying HTML and CSS", correct: false }
        ]
    },

    {
        question: "What do they also call functions in Javascript?",
        answers: [
            { text: "Methods", correct: true },
            { text: "Variables", correct: false },
            { text: "Instance", correct: false },
        ]
    },

    {
        question: "What is CSS used for?",
        answers: [
            { text: "to create interactivity", correct: false },
            { text: "to style and layout web pages", correct: true },
            { text: "to run for loops", correct: false },
        ]
    },

    {
        question: "What is Visual Studio Code?",
        answers: [
            { text: "programming language", correct: false },
            { text: "source-code editor", correct: true },
            { text: "Browser extension", correct: false },
        ]
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let timeRemaining = 60;
let score = 0;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startButton.style.display = "none";
    renderQuestion();
    timerId = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `Time: ${timeRemaining}`;
        if (timeRemaining === 0) {
            clearInterval(timerId);
            showFinalScore();
        }
    }, 1000);
}

function renderQuestion() {
    quizContainer.innerHTML = "";
    const currentQuestion = questions[currentQuestionIndex];
    const questionEl = document.createElement("p");
    questionEl.textContent = currentQuestion.question;
    quizContainer.appendChild(questionEl);
    currentQuestion.answers.forEach((answer) => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer.text;
        answerButton.addEventListener("click", () => {
            if (currentQuestionIndex === questions.length) {
                return;
            }
            if (answer.correct) {
                score++;
            } else {
                timeRemaining -= 10;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex === questions.length) {
                showFinalScore();
                return;
            }
            renderQuestion();
        });
        quizContainer.appendChild(answerButton);
    });
}

function showFinalScore() {
    clearInterval(timerId);
    finalScoreDisplay.textContent = score;
    finalScoreContainer.classList.remove("hide");
}
