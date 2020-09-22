$(document).ready(function () {
    var currentQuestionIndex = 0;
    var runTimer = true;
    var highScores = $(".highscores");
    var quizBody = $(".quiz-body");
    var quizStart = $(".start-quiz");
    var timerText = document.getElementById('timer');
    var score = 0;
    resetTimer();

    $(document).ready(function () {
        quizStart.show();
        highScores.hide();
        quizBody.hide();
    });

    $("#start-button").on("click", function () {
        startQuiz();
    });

    function resetTimer() {
        timerText.innerHTML = 001 + ":" + 30;
    }

    //timer code
    function startTimer() {
        if (runTimer) {
            var presentTime = timerText.innerHTML;
            var timeArray = presentTime.split(/[:]+/);
            var m = timeArray[0];
            var s = checkSecond((timeArray[1] - 1));
            if (s == 59) { m = 0 }
            if (m === 0 && s <= 00) {
                runTimer = false;
            }
            timerText.innerHTML = m + ":" + s;
            setTimeout(startTimer, 1000);

        } else {
            resetTimer();
        }
    }
    function removeTime() {
        var presentTime = timerText.innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = timeArray[1];
        if (m == 1 || (m == 0 && s >= 20)) {
            s = (parseInt(s) - 20).toString();
        }
        else {
            s = "00";
            runTimer = false;
        }
        timerText.innerHTML = m + ":" + s;
    }

    function checkSecond(sec) {

        if (sec < 10 && sec >= 0) { sec = "0" + sec };
        if (sec < 0) { sec = "59" };
        return sec;
    }

    function startQuiz() {
        quizStart.hide();
        quizBody.show();
        startTimer(runTimer);
        getQuestion();
    };

    function getQuestion() {
        var questionsLength = questions.length;

        if (questionsLength > currentQuestionIndex) {
            var currentQuestion = questions[currentQuestionIndex];
            var currentChoices = questions[currentQuestionIndex].choices;
            var answer = questions[currentQuestionIndex].answer;
            console.log(currentChoices);

            $("#question-title").text(currentQuestion.question);

            for (var i = 0; i < currentChoices.length; i++) {
                var choiceSelection = document.createElement("button");
                choiceSelection.setAttribute("class", "choice");
                choiceSelection.setAttribute("value", currentChoices[i]);
                choiceSelection.addEventListener("click", function () {
                    if (this.value === answer) {
                        score = score + 20;
                        alert("Correct Answer! Your current score is " + score);
                    } else {
                        alert("Wrong Answer :(");
                        removeTime();
                    }
                    $('#choices').empty();
                    currentQuestionIndex++;
                    getQuestion();
                });

                choiceSelection.textContent = i + 1 + ". " + currentChoices[i];

                $("#choices").append(choiceSelection);
            }
        }
        else {
            quizBody.hide();
            highScores.show();
        }
    }
    $("#back-button").on("click", function () {
        highScores.hide();
        quizStart.show();
    });

    $("#view-scores").on("click", function () {
        quizBody.hide();
        quizStart.hide();
        highScores.show();
    });


});

var questions = [
    {
        question: "What is the best programming language?",
        choices: ["Java", "Go", "Ruby", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "Is CSS fun",
        choices: ["Yes", "No"],
        answer: "No"
    },
    {
        question: "What are the JavaScript Datatypes?",
        choices: ["Number, String, Boolean, Object, Undefined", "Array, Dog, Cat", "Computer, Mouse, Keyboard"],
        answer: "Number, String, Boolean, Object, Undefined"
    },
    {
        question: "What company developed JavaScript?",
        choices: ["CWRU", "Netscape", "Google", "Amazon"],
        answer: "Netscape"
    },
    {
        question: "A box that allows the user to enter input by providing a text box is called a...?",
        choices: ["Box", "JavaSript", "Boolean", "Prompt Box"],
        answer: "Prompt Box"
    }
]
