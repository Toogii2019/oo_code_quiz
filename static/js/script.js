function updateScoreBoard(currentQuizName) {
  var quizResult = JSON.parse(localStorage.getItem(`${currentQuizName}QuizResult`));
  if (quizResult) {
    nameOnScoreBoard.textContent = quizResult.player;
    dateOnScoreBoard.textContent = quizResult.date;
    highestScoreOnScoreBoard.textContent = quizResult.score;
  }
}

function quizLandingPage(quizName, numberOfQuesions, toTalTime) {
  timeEl.textContent = toTalTime;
  scoreEl.textContent = 0;
  scoreBoardName.value = quizName;
  quizObj = null;
  resetDom(parentDomObj);
  updateScoreBoard(quizName);
  var childDomObjArray = [{div: {class: "quiz-type", textContent: quizName}}, {div: {class: "number-of-questions", textContent: numberOfQuesions}}, {div: {class: "total-time", textContent: toTalTime}}];
  landingPageDomArray = quizDomCreate(parentDomObj, childDomObjArray);
}

var defaultResult = {player: "Anonymous", date: "1999-01-01", score: 0};

var nameOnScoreBoard = document.getElementById("scoreboard-initial");
var dateOnScoreBoard = document.getElementById("scoreboard-date");
var highestScoreOnScoreBoard = document.getElementById("scoreboard-score");

var parentDomObj = document.getElementsByClassName("card-body")[0]; 
var landingPageDomArray;
var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("score");
var scoreBoardName = document.getElementById("score-board-type");
var quizName = "Javascript";
var myQuestions = jsQuestions;
var numberOfQuesions = myQuestions.length;
var toTalTime = numberOfQuesions*15

quizLandingPage(quizName, numberOfQuesions, toTalTime);


var quizTypeEl = document.getElementById("quiz-types");

quizTypeEl.addEventListener("click", function (event) {
  var element = event.target;
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

var quizObj;
var QuizButton = document.getElementById("start-next-finish");

QuizButton.addEventListener("click", playQuiz); 


var scoreTypeButton = document.getElementById("score-board-type");
scoreTypeButton.addEventListener("change", function(event) {
  updateScoreBoard(event.target.value);
})
