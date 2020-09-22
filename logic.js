$(document).ready(function () {
    var currentQuestionIndex = 0;
    var runTimer = true;
    var highScores = $(".highscores");
    var quizBody = $(".quiz-body");
    var quizStart = $(".start-quiz");
    var enterHighscores = $(".enter-highscores");
    var timerText = document.getElementById('timer');
    var score = 0;
    var highScoresStorage = JSON.parse(sessionStorage.getItem("highscores")) || [];

    if (highScoresStorage.length > 1) {
        highScoresStorage.forEach(score => {
            createScores(score);
        })
    }

    resetTimer();

    $(document).ready(function () {
        quizStart.show();
        highScores.hide();
        quizBody.hide();
        enterHighscores.hide();
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
            if (m == "0" && s == "00") {
                runTimer = false;
                alert("Time is up!");
                highScoreInput();
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
        runTimer = true;
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
                        if (runTimer === false) {
                            highScoreInput();
                        }
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
            runTimer = false;
            resetTimer();
            resetQuiz();
            quizBody.hide();
            highScoreInput();
        }
    }

    function resetQuiz() {
        $('#choices').empty();
        $("#question-title").text(null);
        currentQuestionIndex = 0;
    }

    function highScoreInput() {
        resetQuiz();
        resetTimer();
        quizBody.hide();
        enterHighscores.show();
    }

    $("#back-button").on("click", function () {
        highScores.hide();
        enterHighscores.hide();
        quizStart.show();
    });

    $("#view-scores").on("click", function () {
        resetQuiz();
        quizBody.hide();
        quizStart.hide();
        enterHighscores.hide();
        highScores.show();
        runTimer = false;
        resetTimer();
    });

    $("#highscore-init").on("click", function () {
        var userInitials = document.getElementById("initials").value;
        var highscorePlusInitials = userInitials + "-" + score;
        createScores(highscorePlusInitials);
        highScoresStorage.push(highscorePlusInitials);
        sessionStorage.setItem("highscores", JSON.stringify(highScoresStorage));

        enterHighscores.hide();
        highScores.show();
    });

    $("#clear-score").on("click", function () {
        sessionStorage.setItem("highscores", JSON.stringify([]));
        $("#initial-input").empty();
    })

    function createScores(highscorePlusInitials) {
        var initialInput = $("#initial-input");
        var newInitials = document.createElement("li");
        newInitials.setAttribute("class", "score");
        newInitials.innerHTML = highscorePlusInitials;
        initialInput.append(newInitials);
    }
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
