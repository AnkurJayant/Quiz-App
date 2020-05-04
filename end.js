const  username=document.getElementById("username");
const saveScoreBtn=document.getElementById("saveScoreBtn");
const finalScore=document.getElementById("finalScore");
const mostRecentScore=localStorage.getItem('mostRecentScore');  
const highScores=JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES=5;
console.log(highScores);
finalScore.innerText=mostRecentScore;

username.addEventListener("keyup",()=>{
    saveScoreBtn.disabled=!username.value;//username.value is false by default
})

saveHighScore=e=>{     
    e.preventDefault();
    const score={
        score:mostRecentScore,
        name:username.value
    };
    highScores.push(score);
    highScores.sort((a,b)=>b.score - a.score); /*What we actually did oever here is for every new entry we added it in the array and we sorted it and cut of the last entry since we only wanna display the top 5 scores */
    highScores.splice(5);
    /*push sort and splice*/
    console.log(highScores);
    localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.assign("/");
}