const highScoresList=document.getElementById("highScoresList");
const highScores=JSON.parse(localStorage.getItem("highScores"))||[];
highScoresList.innerHTML=highScores
.map(score=>{/*what map does is it takes an incoming array and it allows to convert it's elements into something new as here we converted those elements into 'li' elements */
    return `<li class="high-scores">${score.name} - ${score.score}</li>`;
}).join("") ;