function newQuizObj(quizName, toTalTime, myQuestions) {
    var quizObj = new Object();
    quizObj.name = quizName;
    quizObj.total_time = toTalTime;
    quizObj.number_of_questions = myQuestions.length;
    quizObj.index = 0;
    quizObj.question_array = myQuestions;

    quizObj.run = function() {
        if (this.index === 0) {
            this.startQuiz();
        }
        else if (this.index === this.number_of_questions) {
            // this.endQuiz();
            alert("Ended");
            this.endQuiz();
        }
        else {
            this.playQuiz();
        }
    }
    
    quizObj.startQuiz = function() {
        childDomObjArray = [{div: {class:"question-header", textContent: `Question ${this.index+1} out of ${this.number_of_questions}`}}, 
        {div: {class: "question", textContent: this.question_array[this.index].title}}, {div: {class: "answers", textContent: this.question_array[this.index].choices}}];
        QuizButton.textContent = "Next";
        resetDom(parentDomObj);
        quizDomCreate(parentDomObj, childDomObjArray); 
        
    }
    quizObj.playQuiz = function() {
        var questionHeaderField = document.getElementsByClassName("question-header")[0];
        var questionField = document.getElementsByClassName("question")[0];
        var answerField = document.getElementsByClassName("answers")[0];
        questionHeaderField.textContent = `Question ${this.index+1} out of ${this.number_of_questions}`;
        questionField.textContent = this.question_array[this.index].title;
        answerField.textContent = this.question_array[this.index].choices;
    }

    quizObj.endQuiz = function() {
        alert("Passing to end");
        resetDom(parentDomObj);
        QuizButton.textContent = "End Quiz";
        childDomObjArray = [{input: {class: "center", id:"initials-input", placeholder: "Your Initials"}}, {div: {type: "number", textContent: `Your Quiz Score:  `}}, {div: {type: "number", textContent: `Time left: `}}, {div: {type: "number", textContent: `Your Total Score`}}];
        quizDomCreate(parentDomObj, childDomObjArray); 
        
    }


    return quizObj;

} 

