function quizLandingPage(quizName, numberOfQuesions, toTalTime) {
  questionIndex = 0;
  timeEl.textContent = toTalTime;
  scoreBoardName.value = quizName;
  resetDom(parentDomObj);
  var childDomObjArray = [{div: {class: "quiz-type", textContent: quizName}}, {div: {class: "number-of-questions", textContent: numberOfQuesions}}, {div: {class: "total-time", textContent: toTalTime}}];
  landingPageDomArray = quizDomCreate(parentDomObj, childDomObjArray);
}


var parentDomObj = document.getElementsByClassName("card-body")[0]; 

var landingPageDomArray;
var questionIndex = 0;
var timeEl = document.getElementById("time");
var scoreBoardName = document.getElementById("score-board-type");
var quizName = "Javascript";
myQuestions = jsQuestions;
numberOfQuesions = myQuestions.length;
toTalTime = numberOfQuesions*15

quizLandingPage(quizName, numberOfQuesions, toTalTime);

var quizTypeEl = document.getElementById("quiz-types");

quizTypeEl.addEventListener("click", function (event) {
  var element = event.target;
  index = 0;
  currentScore = 0;
  if (element.matches("li")) {
    switch(element.textContent.split(" ")[0]) {
      case "HTML":
        myQuestions = htmlQuestions;
        numberOfQuesions = myQuestions.length;
        console.log(myQuestions);
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
    console.log(quizObj.name);
    quizObj.run();
  } 
  else {
    quizObj.index ++;
    quizObj.run();
    console.log("Already started" + quizObj.index);
  }

}

var quizObj;
var QuizButton = document.getElementById("start-next-finish");

QuizButton.addEventListener("click", playQuiz); 



