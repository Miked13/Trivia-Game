$(document).ready(function () {
    // Declaring variables
    var trivia = [
        {
            question: "Who wrote 'Das Kapital' and 'The Communist Manifesto'?",
            answer: ["John Locke", "Vladmir Lenin", "Karl Marx", "Friedrich Nietzsche"],
            answerCheck: [false, false, true, false],
            info: "Marx's theories about society, economics and politics—collectively understood as Marxism—hold that human societies develop through class struggle. In capitalism, this manifests itself in the conflict between the ruling classes (known as the bourgeoisie) that control the means of production and the working classes (known as the proletariat) that enable these means by selling their labour power in return for wages",
            media: "assets/images/trivia1.jpg",
        },

        {
            question: "What 17th-century philosopher said 'Without God nothing can be conceived'?",
            answer: ["Niccolo Machiavelli", "Immanuel Kant", "Thomas Hobbes", "Benedict De Spinoza"],
            answerCheck: [false, false, false, true],
            info: "Benedict de Spinoza  was among the most important of the post-Cartesian philosophers who flourished in the second half of the 17th century. He made significant contributions in virtually every area of philosophy, and his writings reveal the influence of such divergent sources as Stoicism, Jewish Rationalism, Machiavelli, Hobbes, Descartes, and a variety of heterodox religious thinkers of his day. For this reason he is difficult to categorize, though he is usually counted, along with Descartes and Leibniz, as one of the three major Rationalists",
            media: "assets/images/trivia2.jpg",
        },

        {
            question: "Who famously said: 'Life must be understood backward. But it must be lived forward.'?",
            answer: ["Sigmund Freud", "John Stuart Mill", "Soren Kierkegaard", "Immanuel Kant"],
            answerCheck: [false, false, true, false],
            info: "Søren Aabye Kierkegaard was a Danish philosopher, theologian, poet, social critic and religious author who is widely considered to be the first existentialist philosopher. He wrote critical texts on organized religion, Christendom, morality, ethics, psychology, and the philosophy of religion, displaying a fondness for metaphor, irony and parables. Much of his philosophical work deals with the issues of how one lives as a 'single individual', giving priority to concrete human reality over abstract thinking and highlighting the importance of personal choice and commitment",
            media: "assets/images/trivia3.jpg",
        },

        {
            question: "Who originally said 'Cogito, ergo sum' ('I think, therefore I am')?",
            answer: ["Friedrich Nietzsche", "Rene Descartes", "Nicolo Machiavelli", "Francis Bacon"],
            answerCheck: [false, true, false, false],
            info: "René Descartes is often credited with being the “Father of Modern Philosophy.” This title is justified due both to his break with the traditional Scholastic-Aristotelian philosophy prevalent at his time and to his development and promotion of the new, mechanistic sciences.",
            media: "assets/images/trivia4.jpg",
        }

    ]
    var trueAnswer = 0;     //stats correct answers
    var wrongAnswer = 0;   //stats wrong answers 
    var unansweredQuestions = 0;    //stats questions not guessed
    var questionAsked = 0;     //stats question currently being dipslayed. 

    //The game starts when button  is clicked
    $("#startbutton").on("click", function () {
        $("#startbutton").show("slow", showTrivia)
    });

    
    //The triva page is diplayed by adding elements in the DOM using js
    function showTrivia() {
        $("#container").empty();
        var timerDisplay = $("<h2>");
        var questionDisplay = $("<h2>");
        timerDisplay.appendTo("#container");
        questionDisplay.appendTo("#container");
        var timeLeft = 30;
        timerDisplay.html("<h2>" + "You have " + timeLeft + " seconds remaining" + "</h2>");
        var countDown = setInterval(function () {
            timeLeft--;
            timerDisplay.html("<h2>" + "You have " + timeLeft + " seconds remaining" + "</h2>");
            if (timeLeft === 0) {
                clearInterval(countDown);
                $("#container").empty();
                $("#container").show("slow", displayexpiredTime);
                unansweredQuestions++;
            }

        }, 1000);
        questionDisplay.html(trivia[questionAsked].question);
        for(var i = 0; i < trivia[questionAsked].answer.length; i++){
            var answer = $("<button>");
            answer.html(trivia[questionAsked].answer[i]);
            answer.addClass("btn btn-primary");
            answer.attr("value", trivia[questionAsked].answerCheck[i]);
            answer.attr("id", "a" + i);
            answer.appendTo($("#container"));
        }

        $(".btn").on("click", function(){
            if($(this).attr("value") === "true"){
                $("#container").show("slow", displaycorrectAnswer);
                clearInterval(countDown);
                trueAnswer++;
            }
            if($(this).attr("value") === "false"){
                $("#container").show("slow", displayincorrectAnswer);
                clearInterval(countDown);
                wrongAnswer++;
            }
        });
    }

    //Display this page when the user guessed right
    function displaycorrectAnswer (){
        $("#container").empty();
        var timeout = setTimeout(showTrivia, 10000);
        var answerContainer = $("<div>");
        answerContainer.addClass("lead");
        var winText = $("<h2>");
        var info = $("<p>");
        var media = $("<img>");
        answerContainer.appendTo($("#container"));
        winText.appendTo($(answerContainer));
        winText.text("Correct Answer!");
        info.appendTo($(answerContainer));
        info.text(trivia[questionAsked].info);
        media.appendTo($(answerContainer));
        media.attr("src", trivia[questionAsked].media);
        //If this is the last questions, the DOM will display the game's statistics after it shows the answer
        if(questionAsked === (trivia.length - 1)){
            clearTimeout(timeout);
            setTimeout(gameOver, 10000);
        }
        questionAsked++;
    }

    //Display this page when the user guess wrong
    function displayincorrectAnswer (){
        $("#container").empty();
        var timeout = setTimeout(showTrivia, 10000);
        var answerContainer = $("<div>");
        answerContainer.addClass("lead");
        var lossText = $("<h2>");
        var info = $("<p>");
        var media = $("<img>");
        answerContainer.appendTo($("#container"));
        lossText.appendTo($(answerContainer));
        lossText.text("Wrong Answer! The correct answer is: " + trivia[questionAsked].answer[trivia[questionAsked].answerCheck.indexOf(true)]);
        info.appendTo($(answerContainer));
        info.text(trivia[questionAsked].info);
        media.appendTo($(answerContainer));
        media.attr("src", trivia[questionAsked].media);
            //If this is the last questions, the DOM will display the game's statistics after it shows the answer

        if(questionAsked === (trivia.length - 1)){
            clearTimeout(timeout);
            setTimeout(gameOver, 10000);
            
        }
        questionAsked++;
    }

    //Display this page when the user did not guess on time
    function displayexpiredTime (){
        $("#container").empty();
        var timeout = setTimeout(showTrivia, 10000);
        var answerContainer = $("<div>");
        answerContainer.addClass("lead");
        var lossText = $("<h2>");
        var info = $("<p>");
        var media = $("<img>");
        answerContainer.appendTo($("#container"));
        lossText.appendTo($(answerContainer));
        lossText.text("The time has expired! The correct answer is: " + trivia[questionAsked].answer[trivia[questionAsked].answerCheck.indexOf(true)]);
        info.appendTo($(answerContainer));
        info.text(trivia[questionAsked].info);
        media.appendTo($(answerContainer));
        media.attr("src", trivia[questionAsked].media);
        if(questionAsked === (trivia.length - 1)){
            clearTimeout(timeout);
            gameOver();
        }
        questionAsked++;
    }

    //Display the stats
    function gameOver(){
        $("#container").empty();
        var reStart = $("<button>");
        reStart.addClass("btn btn-primary playAgain");
        reStart.text("Replay?");
        reStart.appendTo("#container");
        var questionAsked = $("<h3>");
        questionAsked.addClass("display-4");
        questionAsked.appendTo("#container");
        questionAsked.html("There are " + trivia.length + " questions in total!");
        var totalcorrectAnswer = $("<h3>");
        totalcorrectAnswer.addClass("display-4");
        totalcorrectAnswer.appendTo("#container");
        totalcorrectAnswer.html("You have " + trueAnswer + " correct answers!");
        var totalincorrectAsnwer = $("<h3>");
        totalincorrectAsnwer.addClass("display-4");
        totalincorrectAsnwer.appendTo("#container");
        totalincorrectAsnwer.html("You have " + wrongAnswer + " incorrect answers!")
        var totalUnansweredQuestions = $("<h3>");
        totalUnansweredQuestions.addClass("display-4");
        totalUnansweredQuestions.appendTo("#container");
        totalUnansweredQuestions.html("You have not answered " + unansweredQuestions + " questions!");
        if(totalUnansweredQuestions > 0){
            totalUnansweredQuestions.html("You have " + unansweredQuestions + " unanswered questions!");
        }
        $(".playAgain").on("click", function(){
            totalcorrectAnswer.remove();
            totalincorrectAsnwer.remove();
            totalUnansweredQuestions.remove();
            questionAsked = 0;
            wrongAnswer = 0;
            trueAnswer = 0;
            showTrivia();
        });
    }

});