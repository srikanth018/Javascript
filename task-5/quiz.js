
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

function  fetchQuestions(){
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            getquestions();
        })
}

fetchQuestions();

function getquestions(){
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML="";

    currentQuestion.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent=option;
        btn.classList.add('option');
        btn.onclick= ()=> checkAnswer(option,currentQuestion.answer);
        optionsContainer.appendChild(btn);
    });
}

// document.getElementById("next-button").addEventListener('click', ()=>{
//     currentQuestionIndex++;
//     getquestions();
// })

function checkAnswer(option,answer){
    if(option === answer){
        score++;     
    }
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        getquestions();
    }else{
        document.getElementById("score").textContent = score;
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("score-card").style.display = "flex";
    }
}




