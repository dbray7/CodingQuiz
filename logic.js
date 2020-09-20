$(document).ready(function () {
    var currentQuestionIndex = 0;
    document.getElementById('timer').innerHTML =
        001 + ":" + 30;

    $(document).ready(function () {
        $(".dynamic-center > div").addClass("start-quiz");
        $(".highscores").hide();
        $(".quiz-body").hide();
    });

    $(".start-quiz").on("click", function () {
        startQuiz();
    });

    function startTimer() {
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSecond((timeArray[1] - 1));
        if (s == 59) { m = m - 1 }
        //if(m<0){alert('timer completed')}

        document.getElementById('timer').innerHTML =
            m + ":" + s;
        console.log(m)
        setTimeout(startTimer, 1000);
    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
        if (sec < 0) { sec = "59" };
        return sec;
    }

    function startQuiz() {
        var startScreenEl = document.getElementById("start-screen")

        // hide start screen once start button is clicked

        // start timer upon clicking "Start Quiz"

        getQuestion()
    }

    function getQuestion() {
        var currentQuestion = questions[currentQuestionIndex]
        var currentChoices = questions[currentQuestionIndex].choices

        var titleEl = document.getElementById("question-title")
        titleEl.textContent = currentQuestion.question

        var choicesEl = document.getElementById("choices")
        console.log(currentChoices)

        for (var i = 0; i < currentChoices.length; i++) {
            var choiceSelection = document.createElement("button")
            choiceSelection.setAttribute("class", "choice")
            choiceSelection.setAttribute("value", currentChoices[i])

            choiceSelection.textContent = i + 1 + ". " + currentChoices[i]

            choicesEl.appendChild(choiceSelection)
        }
    }

    function startQuiz() {
        $(this).hide();
        var quizBody = $(".quiz-body");
        $(".dynamic-content > div").replaceWith(quizBody);
        quizBody.show();
        startTimer();
    };

    $("#back-button").on("click", function () {
        var quiz = $(".quiz-body");
        $(".dynamic-content.div").replaceWith($(".quiz-body"));
    });

    $("#view-scores").on("click", function () {
        $(".dynamic-content.div").replaceWith($(".highscores"));
        $(".highscores").show();
    });

});
