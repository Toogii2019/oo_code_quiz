function updateScoreBoard(currentQuizName) {
  var quizResult = JSON.parse(localStorage.getItem(`${currentQuizName}QuizResult`));
  if (quizResult) {
    nameOnScoreBoard.textContent = quizResult.player;
    dateOnScoreBoard.textContent = quizResult.date;
    highestScoreOnScoreBoard.textContent = quizResult.score;
  }
  else {
    nameOnScoreBoard.textContent = "No Entry";
    dateOnScoreBoard.textContent = "No Entry";
    highestScoreOnScoreBoard.textContent = "No Entry";
  }
}

function quizLandingPage(quizName, numberOfQuesions, toTalTime) {
  timeEl.textContent = toTalTime;
  scoreEl.textContent = 0;
  scoreBoardName.value = quizName;
  
  quizObj = null;

  clearInterval(timerInterval);
  countDown = myQuestions.length*15;
  resetDom(parentDomObj);
  updateScoreBoard(quizName);
  var childDomObjArray = [{h3: {class: "quiz-type", textContent: quizName}}, {h5: {class: "number-of-questions", textContent: `Number of Questions: ${numberOfQuesions}`}}, {h5: {class: "total-time", textContent: `Time: ${toTalTime} seconds`}}];
  landingPageDomArray = quizDomCreate(parentDomObj, childDomObjArray);
}
var timerInterval;
var defaultResult = {player: "Anonymous", date: "1999-01-01", score: 0};
var nameOnScoreBoard = document.getElementById("scoreboard-initial");
var dateOnScoreBoard = document.getElementById("scoreboard-date");
var highestScoreOnScoreBoard = document.getElementById("scoreboard-score");

var parentDomObj = document.getElementsByClassName("card-body")[0]; 
var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("score");
var scoreBoardName = document.getElementById("score-board-type");
var quizName = "Javascript";
var myQuestions = jsQuestions;
var numberOfQuesions = myQuestions.length;
var toTalTime = numberOfQuesions*15;

quizLandingPage(quizName, numberOfQuesions, toTalTime);

var quizTypeEl = document.getElementById("quiz-types");

quizTypeEl.addEventListener("click", function (event) {
  var element = event.target;
  QuizButton.textContent = "Start Quiz";
  if (element.matches("li")) {
    switch(element.textContent.split(" ")[0]) {
      case "HTML":
        myQuestions = htmlQuestions;
        numberOfQuesions = myQuestions.length;
        toTalTime = numberOfQuesions*15
        quizName = "HTML";
        quizLandingPage(quizName, numberOfQuesions, toTalTime);

        break;
      case "JS":
        myQuestions = jsQuestions;
        numberOfQuesions = myQuestions.length;
        toTalTime = numberOfQuesions*15
        quizName = "Javascript";
        quizLandingPage(quizName, numberOfQuesions, toTalTime);
        break;
      case "CSS":
        myQuestions = cssQuestions;
        numberOfQuesions = myQuestions.length;
        toTalTime = numberOfQuesions*15
        quizName = "CSS";
        quizLandingPage(quizName, numberOfQuesions, toTalTime);
        break;
      default:
        break;
    }
  } 
})

function playQuiz(event) {
  console.log(quizObj);
  if (!quizObj) {
    quizObj = newQuizObj(quizName, toTalTime, myQuestions);
    quizObj.run();
  } 
  else {
    if (quizObj.endCalled) {
      quizObj.submitScore();
      return;
    }
    quizObj.index ++;
    quizObj.run();
    scoreEl.textContent = quizObj.current_score;
  }

}

var quizObj = null;
var QuizButton = document.getElementById("start-next-finish");

QuizButton.addEventListener("click", playQuiz); 


scoreBoardName.addEventListener("change", function(event) {
  updateScoreBoard(event.target.value);
})
