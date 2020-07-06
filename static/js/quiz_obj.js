function newQuizObj(quizName, toTalTime, myQuestions) {
    var quizObj = new Object();
    quizObj.name = quizName;
    quizObj.total_time = toTalTime;
    quizObj.number_of_questions = myQuestions.length;
    quizObj.index = 0;
    quizObj.question_array = myQuestions;
    quizObj.current_score = 0;
    quizObj.timer = 0;
    quizObj.endCalled = false;
    quizObj.playerName = "Anonymous";
    quizObj.highest_score = 0;
    quizObj.timerStop = false;
    quizObj.timeRemaining = myQuestions.length*15;

    quizObj.run = function() {


        if (this.index === 0) {
            this.startQuiz();
        }
        else if (this.index === this.number_of_questions) {
            // this.endQuiz();
            this.checkAnswer();
            this.endQuiz();
        }
        else if (this.index > 0) {
            this.checkAnswer();
            this.playQuiz();
        }
    }
    
    quizObj.startQuiz = function() {
        childDomObjArray = [{div: {class:"question-header", textContent: `Question ${this.index+1} out of ${this.number_of_questions}`}}, 
        {div: {class: "question", textContent: this.question_array[this.index].title}}, {div: {class: "answers"}}];
        QuizButton.textContent = "Next";
        resetDom(parentDomObj);
        quizDomCreate(parentDomObj, childDomObjArray); 
        this.displayAnswers();
        
    }
    quizObj.playQuiz = function() {

        var questionHeaderField = document.getElementsByClassName("question-header")[0];
        var questionField = document.getElementsByClassName("question")[0];
        
        questionHeaderField.textContent = `Question ${this.index+1} out of ${this.number_of_questions}`;
        questionField.textContent = this.question_array[this.index].title;
        // answerField.textContent = this.question_array[this.index].choices;
        this.displayAnswers();


    }

    quizObj.endQuiz = function() {
        resetDom(parentDomObj);
        this.endCalled = true;
        QuizButton.textContent = "End Quiz";
        childDomObjArray = [{input: {class: "center", id:"initials-input", placeholder: "Your Initials"}}, {div: {type: "number", textContent: `Your Quiz Score:  ${this.current_score}`}}, {div: {type: "number", textContent: `Time left: ${this.timer}`}}, {div: {type: "number", textContent: `Your Total Score ${this.current_score + this.timer/10}`}}];
        quizDomCreate(parentDomObj, childDomObjArray); 
        
    }
    quizObj.displayAnswers = function() {
        var answerField = document.getElementsByClassName("answers")[0];
        resetDom(answerField);
        var childObj1 = [{form: {id: "quiz-form"}}];
        quizDomCreate(answerField, childObj1); 

        this.question_array[this.index].choices.forEach(function(answerItem, i) {

            var parentObj = document.getElementById("quiz-form");
            var childObj2 = [{div: {class: `form-check form-check-${i} left answer-form`}}];
            quizDomCreate(parentObj, childObj2); 

            var parentObj3 = document.getElementsByClassName(`form-check-${i}`)[0];
            var childObj3 = [{input: {class: "form-check-input quiz-answers", id: "choice", type: "radio", name: "choice", value: answerItem}}];
            quizDomCreate(parentObj3, childObj3);   
            var childObj4 = [{label: {class: "form-check-label", for: "choice", textContent: answerItem}}]; 
            quizDomCreate(parentObj3, childObj4);    
        })
    }
    quizObj.checkAnswer = function() {
        var quizAnswers = document.getElementsByClassName("quiz-answers");
        for (i=0;i<quizAnswers.length;i++) {
            if(quizAnswers[i].checked) {
                console.log(quizAnswers[i].value);
                if (quizAnswers[i].value === this.question_array[this.index-1].answer) {
                    this.applyScore();
                }
                else {
                    console.log("incorrect");
                    this.applyPenalty();
                }
            }
        }
        // quizAnswers.forEach(function(answer, i) {
        //     console.log(answer);
        // })
        
    }
    quizObj.applyScore = function() {
        this.current_score += 20;
    }

    quizObj.applyPenalty = function() {
        if (this.timer >= 15) {
            this.timer -= 15;
        }
        else {
            this.timer = 0;
        }
    }


    quizObj.submitScore = function () {
        var playerNameInput = document.getElementById("initials-input");
        if (!playerNameInput.value) {
            this.playerName = "Anonymous";
        }
        else {
            this.playerName = playerNameInput.value;
        }
        console.log(this.playerName);
        var quizResult = JSON.parse(localStorage.getItem(`${this.name}QuizResult`));
        console.log(quizResult);
        if (quizResult) {
            if (quizResult.score < this.current_score) {
                today = new Date();

                quizResult = {
                    player: this.playerName,
                    date: `${today.toDateString()} ${today.toTimeString().split(" ").slice(0, 1).toLocaleString()}`,
                    score: this.current_score
                }
                localStorage.setItem(`${this.name}QuizResult`, JSON.stringify(quizResult));
                
            }

        }
        else {
            today = new Date();
            quizResult = {
                player: this.playerName,
                date: `${today.toDateString()} ${today.toTimeString().split(" ").slice(0, 1).toLocaleString()}`,
                score: this.current_score
            }
            localStorage.setItem(`${this.name}QuizResult`, JSON.stringify(quizResult));
            
        }
        this.updateScoreBoard();
        location.reload();
    }

    quizObj.updateScoreBoard = function() {
        this.highest_score = JSON.parse(localStorage.getItem(`${this.name}QuizResult`));
        nameOnScoreBoard.textContent = this.highest_score.player;
        dateOnScoreBoard.textContent = this.highest_score.date;
        highestScoreOnScoreBoard.textContent = this.highest_score.score;

    }
    quizObj.timer_start = function() {
        console.log(this.timeRemaining);
        timerInterval = setInterval(function() {
            console.log(this.timeRemaining);
            this.timeRemaining--;
            timeEl.textContent = this.timeRemaining;       
        }, 1000);
    }
    return quizObj;
}

