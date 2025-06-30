const quizData = [
    {
    question: "Which of the following are hardware components of a computer?",
    type: "multi",
    options: ["CPU", "RAM", "Operating System", "Monitor"],
    answer: ["CPU", "RAM", "Monitor"]
    },
    {
    question: "Which of these are examples of system software?",
    type: "multi",
    options: ["Windows", "MS Word", "Linux", "Google Chrome"],
    answer: ["Windows", "Linux"]
    },
    {
    question: "Fill in the blank: The programming language used to style web pages is ____.",
    type: "text",
    answer: "CSS"
   },
   {
    question: "Fill in the blank: The software that manages computer hardware is called ____.",
    type: "text",
    answer: "Operating System"
   },



    {
        question: "Select all prime numbers:",
        type: "multi",
        options: ["2", "4", "5", "9"],
        answer: ["2", "5"]
    },
    {
    question: "Select all input devices from the list below:",
    type: "multi",
    options: ["Keyboard", "Monitor", "Mouse", "Printer"],
    answer: ["Keyboard", "Mouse"]
    },
    {
    question: "Which of the following are programming languages?",
    type: "multi",
    options: ["Python", "HTML", "C++", "Windows"],
    answer: ["Python", "C++"]
   },



    {
    question: "Which of the following are programming languages?",
    type: "multi",
    options: ["Python", "HTML", "Java", "CSS"],
    answer: ["Python", "Java"]
    },
    {
    question: "Fill in the blank: The chemical symbol for water is ____.",
    type: "text",
    answer: "H2O"
    },



];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const nextBtn = document.getElementById('next');
const restartBtn = document.getElementById('restart');
const resultContainer = document.getElementById('result');

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    quizContainer.innerHTML = `<h2>${questionData.question}</h2>`;

    if (questionData.type === 'single') {
        questionData.options.forEach(option => {
            quizContainer.innerHTML += `
                <label>
                    <input type="radio" name="answer" value="${option}"> ${option}
                </label><br>`;
        });
    } else if (questionData.type === 'multi') {
        questionData.options.forEach(option => {
            quizContainer.innerHTML += `
                <label>
                    <input type="checkbox" name="answer" value="${option}"> ${option}
                </label><br>`;
        });
    } else if (questionData.type === 'text') {
        quizContainer.innerHTML += `
            <input type="text" id="textAnswer" placeholder="Type your answer here">`;
    }

    resultContainer.innerHTML = '';
}

function checkAnswer() {
    const questionData = quizData[currentQuestion];
    let isCorrect = false;

    if (questionData.type === 'single') {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (selected && selected.value === questionData.answer) {
            isCorrect = true;
        }
    } else if (questionData.type === 'multi') {
        const selectedOptions = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(opt => opt.value);
        if (selectedOptions.length === questionData.answer.length && selectedOptions.every(opt => questionData.answer.includes(opt))) {
            isCorrect = true;
        }
    } else if (questionData.type === 'text') {
        const userInput = document.getElementById('textAnswer').value.trim().toLowerCase();
        if (userInput === questionData.answer.toLowerCase()) {
            isCorrect = true;
        }
    }

    if (isCorrect) {
        score++;
        resultContainer.innerHTML = `<span style="color:green;">Correct!</span>`;
    } else {
        resultContainer.innerHTML = `<span style="color:red;">Wrong! Correct answer: ${Array.isArray(questionData.answer) ? questionData.answer.join(", ") : questionData.answer}</span>`;
    }

    submitBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        submitBtn.style.display = 'inline-block';
        nextBtn.style.display = 'none';
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    quizContainer.innerHTML = `<h2>You scored ${score} out of ${quizData.length}</h2>`;
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    restartBtn.style.display = 'none';
    loadQuestion();
    submitBtn.style.display = 'inline-block';
}

submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

loadQuestion();
