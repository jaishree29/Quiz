const questions = [
    {
        question: "Which city is the capital of India?",
        answers: [
            { text: "Goa", correct: false},
            { text: "Jaipur", correct: false},
            { text: "Mumbai", correct: false},
            { text: "New Delhi", correct: true}
        ]
    },
    {
        question: "Who is the prime minister of India?",
        answers: [
            { text: "Jawaharlal Nehru", correct: false},
            { text: "Narendra Modi", correct: true},
            { text: "Yogi Aditya Nath", correct: false},
            { text: "Arvind Kejriwal", correct: false}
        ]
    },
    {
        question: "Lucknow is also known as?",
        answers: [
            { text: "Pink City", correct: false},
            { text: "City of Diamonds", correct: false},
            { text: "City of Nawabs", correct: true},
            { text: "City of lakes", correct: false}
        ]
    },
    {
        question: "Will I ever learn JavaScript?🥲",
        answers: [
            { text: "Aayein??", correct: false},
            { text: "kya developer banegi re tu", correct: false},
            { text: "Bhagwan kare tu itna aage jaye itna aage jaye...bss chali jaye bhagwan ke paas hi☠️☠️", correct: true},
            { text: "hum vote nahi dega", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();