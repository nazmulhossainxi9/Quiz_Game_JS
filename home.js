let questions = [
    {
        question: "When does Sheikh Hasina fall down from Bangladesh?",
        answer: [
            {text: "4th August, 2025", correct: false},
            {text: "5th August, 2024", correct: true},
            {text: "5th August, 2025", correct: false},
            {text: "30th July, 2025", correct: false},
        ]
    },
    {
        question: "Which city is known as the City of Education in Bangladesh?",
        answer: [
            {text: "Rajshahi", correct: false},
            {text: "Barishal", correct: false},
            {text: "Dhaka", correct: false},
            {text: "Mymensingh", correct: true},
        ]
    },
    {
        question: "Who was named as 'The Sword of God' in Islam?",
        answer: [
            {text: "Hazrat Umar (R)", correct: false},
            {text: "Khalid Ibne Walid (R)", correct: true},
            {text: "Hazrat Ali (R)", correct: false},
            {text: "Hazar Ibne Razi (R)", correct: false},
        ]
    },
    {
        question: "What is the correct answer of this equation? 5x3+6/3-2",
        answer: [
            {text: "15", correct: true},
            {text: "9", correct: false},
            {text: "21", correct: false},
            {text: "10", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answer: [
            {text: "Kalahari", correct: false},
            {text: "Sahara", correct: false},
            {text: "Amazon", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the smallest city in the world?",
        answer: [
            {text: "Vatican", correct: true},
            {text: "New York", correct: false},
            {text: "Dhaka", correct: false},
            {text: "Panama", correct: false},
        ]
    }
];

let questionElement = document.getElementById("question");
let answerButton = document.getElementById("answer_button");
let nextButton = document.getElementById("next");

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

    currentQuestion.answer.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

startQuiz();
