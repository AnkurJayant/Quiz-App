const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
const progressText=document.getElementById("progressText");
const scoreText=document.getElementById("score");
const progressBarFull=document.getElementById("progressBarFull");
let loader=document.getElementById("loader");
let game=document.getElementById("game");
let currentQuestion={};
let acceptingAnswers=false;
let score=0;
let questionCounter=0;
let availableQuestions=[];

let questions=[];
const CORRECT_BONUS=10;
const MAX_QUESTIONS=3;
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res =>{
  //inside of a promise we can return a promise
  //now res here actually contains an http type response but we need the json version of it right? So :
  return res.json();
  }).then(loadedQuestions=>{
    questions= loadedQuestions.results.map( loadedQuestion=>{
      const formattedQuestion={
          question:loadedQuestion.question
      };
  const answerChoices=[...loadedQuestion.incorrect_answers];  
  
  formattedQuestion.answer=Math.floor(Math.random()*3)+1;
  
  answerChoices.splice(formattedQuestion.answer - 1,0,loadedQuestion.correct_answer);
  answerChoices.forEach((choice,index)=>{
    formattedQuestion["choice" + (index + 1)]=choice;
  });
  return formattedQuestion;
});  
  game.classList.remove("hidden");
  loader.classList.add("hidden");
  startGame();
})
startGame =  () => {
  /*
  For methods in React, the this keyword should represent the component that owns the method.

  That is why you should use arrow functions. With arrow functions, this will always represent the object that defined the arrow function.
  */
    incrementScore(0);
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();  
  };
  
getNewQuestion=()=>{  
  if(availableQuestions.length===0||questionCounter>=MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore',score);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText=`Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS)*100}% `;
    const questionIndex=Math.floor(Math.random()*availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;
    choices.forEach(choice=>{
      const number=choice.dataset["number"];
      choice.innerText=currentQuestion["choice"+number];
    });
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers=true;   
  };

choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
    if(!acceptingAnswers)return;
    acceptingAnswers=false;
    const selectedChoice=e.target;
    const selectedAnswer=selectedChoice.dataset["number"];
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    selectedChoice.parentElement.classList.add(classToApply);
    if(classToApply === "correct"){
      incrementScore(CORRECT_BONUS);
    }else incrementScore(0);
    setTimeout(()=>{
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    },1000);
    });

incrementScore = num =>{
      score+=num;
      scoreText.innerText=score;
    }
});
