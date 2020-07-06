function updateScoreBoard(nameOfQuize) {
  var inputNode = document.getElementById("initials-input");
  if (inputNode.value) {
    playerName = inputNode.value;
  }
  else {
    playerName = "Anonymous";
  }
  // console.log("quizButton called with " + currentScore);
  if (localStorage.getItem(`${nameOfQuize}QuizResult`)) {
    currentHighestScore = JSON.parse(localStorage.getItem(`${nameOfQuize}QuizResult`)).score;
  }
  else {
    currentHighestScore = 0;
  }
  if (totalScore > currentHighestScore) {
    today = new Date();
    var player = {
      initial: playerName,
      score: totalScore,
      date: `${today.toDateString()} ${today.toTimeString().split(" ").slice(0, 1).toLocaleString()}`
    }
    localStorage.setItem(`${nameOfQuize}QuizResult`, JSON.stringify(player));
    // console.log(localStorage);
    
    showScoreBoard(quizName);
  }

  location.reload();

}


function showScoreBoard(nameOfQuize) {
  player = JSON.parse(localStorage.getItem(`${nameOfQuize}QuizResult`));
  if (!player) {
    return;
  }
  initialOnScoreBoard.textContent = player.initial;
  scoreOnScoreBoard.textContent = player.score;  
  dateOnScoreBoard.textContent = player.date;

}

function resetPage() {
  scoreEl.textContent = 0;
  answerField.innerHTML = "";
  QuizButton.textContent = "Start Quiz";
  QuizButton.setAttribute("id", "start-next-finish");
  var subTitle = document.getElementById("quiz");
  subTitle.innerHTML = "";
  index = 0;
  
}
function penaltyApply() {
  if (timeRemaining > 15) {
    timeRemaining -= 15;
  }
  else {
    timeRemaining = 0;
    timerStop = true;
  }
}

function checkAnswer(index) {
  answer = document.getElementsByClassName("quiz-answers");
  for (i=0;i<answer.length;i++) {
    
    if (answer[i].checked) {
      if (answer[i].parentElement.textContent === myQuestions[index-1].answer) {
        currentScore += scoreIncrementStep;
        scoreEl.innerText = currentScore;
        correctAnswerChosen = true;
      }
      else {
        correctAnswerChosen = false;
        penaltyApply();
      }
      answerChosen = true;
      return;
    }
  }
  answerChosen = false;
  if (!endCalled) {
    alert("At least one answer must be chosen!");
  }
  else {
    answerChosen = true;
  }
}

function endQuiz() {
  endCalled = true;
  resetPage();

  timerStop = true;
  if (timeRemaining < 0) {
    timeRemaining = 0;
  }
  clearInterval(timerInterval);
  totalScore = currentScore + timeRemaining/10;
  // console.log("endquiz called with " + currentScore);
  var iniTials = document.createElement("input");
  iniTials.id = "initials-input";
  iniTials.name = "initials-input";
  iniTials.type = "text";
  iniTials.placeholder = "Your Initials";
  iniTials.setAttribute("class", "center");
  var scoreContainer = document.createElement("div");
  scoreContainer.type = "number";
  scoreContainer.textContent = `Your Quiz Score: ${currentScore}`;
  var timeRemainingContainer = document.createElement("div");
  timeRemainingContainer.type = "number";
  timeEl.textContent = timeRemaining;
  timeRemainingContainer.textContent = `Time Remaining: ${timeRemaining} (${timeRemaining/10} score)`
  var totalScoreContainer = document.createElement("div");
  totalScoreContainer.type = "number";
  totalScoreContainer.textContent = `Your Total Score: ${totalScore}`;
  questionField.appendChild(iniTials);
  answerField.appendChild(scoreContainer);
  answerField.appendChild(timeRemainingContainer);
  answerField.appendChild(totalScoreContainer);

  QuizButton.textContent = "Submit";
}

function displayAnswers(index) {
  answerField.innerHTML = "";
  var quizForm = document.createElement("form");
  quizForm.role = "form";
  quizForm.id="quizfrom";



  myQuestions[index].choices.forEach(function(item, i) {
    var answerContainer = document.createElement("div");
    answerContainer.setAttribute("class", "form-check");

    var answerInput = document.createElement("input");
    answerInput.setAttribute("class", "form-check-input quiz-answers");
    answerInput.setAttribute("id", "choice");
    answerInput.type = "radio";
    answerInput.name = "choice";
    answerInput.value = item;

    var answerLabel = document.createElement("label");
    answerLabel.setAttribute("class", "form-check-label");
    answerLabel.for = "choice";
    answerLabel.textContent = item;
    
    
    answerContainer.appendChild(answerInput);
    answerContainer.appendChild(answerLabel);

    quizForm.appendChild(answerContainer);
  }
  )
  answerField.appendChild(quizForm);
}

function displayQuiz(index) {
  if (index === myQuestions.length) {
    // console.log("Calling endquiz");
    
    if (endCalled) {
      // console.log("endcalled is true");
      updateScoreBoard(quizName);
      return;
    }
    else {
     endQuiz();
     return;
    }
  }
  else if (index === 0) {
    QuizButton.textContent = "Next";
  }
  var questionNumEl = document.createElement("h3");
  questionNumEl.textContent = `Question ${index+1} out of ${myQuestions.length}`
  
  var questionEl = document.createElement("p");
  questionEl.textContent = myQuestions[index].title;
  questionField.innerHTML = "";
  questionField.appendChild(questionNumEl);
  questionField.appendChild(questionEl);
  questionField.setAttribute("class", "left");
  // Displaying Answers
  displayAnswers(index);
}


function quizLandingPage() {
  resetPage();
  index = 0;
  timeRemaining = myQuestions.length*15;;
  timeEl.textContent = timeRemaining;
  QuizButton.setAttribute("id", "start-next-finish");
  var subTitle = document.getElementById("quiz");
  var h3 = document.createElement("h3")
  h3.innerText = `${quizName} quiz`;
  subTitle.innerHTML = "";
  subTitle.appendChild(h3);
  var h5 = document.createElement("h5");
  h5.innerText = `Number of Questions: ${myQuestions.length}`;
  subTitle.appendChild(h5);
  var h5 = document.createElement("h5");
  h5.innerText = `Time: ${myQuestions.length*15} seconds`;
  var penaltyNote = document.createElement("p");
  penaltyNote.textContent = "Penalty: There is a penalty for each wrong answered quesion, you will get -15 seconds from your timer.";
  var rewardNote = document.createElement("p");
  rewardNote.textContent = "Reward: If you manage to complete the quiz before time expires, you will get additional points.";
  var instruction = document.createElement("p");

  instruction.textContent = "Score: The highest score will be updated in the scoreboard.";

  subTitle.appendChild(h5);
  subTitle.appendChild(penaltyNote);
  subTitle.appendChild(rewardNote);
  subTitle.appendChild(instruction);

  clearInterval(timerInterval);
  
  return;
}

function setTime() {
  timerInterval = setInterval(function() {
    if (timerStop === true) {
      clearInterval(timerInterval);
    }
    timeRemaining--;
    // console.log(timeRemaining);

    if(timeRemaining < 0) {
      clearInterval(timerInterval);
      timeEl.textContent = 0;
      if (timerStop === false) {
        endQuiz();
      }
      // sendMessage();
    }
    else{
      timeEl.textContent = timeRemaining;
    }

  }, 1000);
}

function playQuiz(event) {
  if (index > 0) {
    checkAnswer(index);
  }
  else if (index === 0) {
    setTime();
  }
  if (answerChosen) {
    displayQuiz(index);
    if (index < myQuestions.length) {
      index++;
    }
  }
}

var quizName = "Javascript";
var quizTypeEl = document.getElementById("quiz-types");

quizTypeEl.addEventListener("click", function (event) {
  var element = event.target;
  index = 0;
  currentScore = 0;
  if (element.matches("li")) {
    switch(element.textContent.split(" ")[0]) {
      case "HTML":
        myQuestions = htmlQuestions;
        quizName = "HTML";
        quizTypeName.value = quizName;
        scoreIncrementStep = Math.floor(highestScore/myQuestions.length)
        quizLandingPage();
        showScoreBoard(quizName);
        
        break;
      case "JS":
        myQuestions = jsQuestions;
        quizName = "Javascript";
        quizTypeName.value = quizName;
        scoreIncrementStep = Math.floor(highestScore/myQuestions.length)
        quizLandingPage();
        showScoreBoard(quizName);
        break;
      case "CSS":
        myQuestions = cssQuestions;
        quizName = "CSS";
        quizTypeName.value = quizName;
        scoreIncrementStep = Math.floor(highestScore/myQuestions.length)
        quizLandingPage();
        showScoreBoard(quizName);
        break;
      default:
        break;
    }
  } 
})

var totalScore = 0;
var timerInterval;
var endCalled = false;
var timerStop = false;
var correctAnswerChosen = false;
var answerChosen = true;
var timeRemaining = 0;
var index = 0;
var scoreBoardType = document.getElementById("quiz-type-choose");

var QuizButton = document.getElementById("start-next-finish");
QuizButton.addEventListener("click", playQuiz);

var myQuestions = jsQuestions;
var questionField = document.getElementById("quiz");
var answerField = document.getElementById("answers");
var timeEl = document.querySelector("#time");
var scoreEl = document.querySelector("#score");

var currentScore = 0;
var highestScore = 100;
var currentHighestScore = 0;
var scoreIncrementStep = Math.floor(highestScore/myQuestions.length);
var answer;
var initialOnScoreBoard = document.getElementById("scoreboard-initial");
// console.log(initialOnScoreBoard);
var scoreOnScoreBoard = document.getElementById("scoreboard-score");
var dateOnScoreBoard = document.getElementById("scoreboard-date");
var quizTypeOnScoreBoard = document.getElementById("scoreboard-date");

var quizTypeName = document.getElementById("quiztype");
quizTypeName.addEventListener("change", function(event) {showScoreBoard(event.target.value)});
showScoreBoard(quizName);
quizLandingPage();
