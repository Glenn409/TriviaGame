
//array containing all trivia questions
var questions_array = [];
addQuestion('question1','answer','guess1','guess2','guess3','img-holder');
addQuestion('question2','answer','guess1','guess2','guess3','img-holder');
addQuestion('question3','answer','guess1','guess2','guess3','img-holder');
addQuestion('question4','answer','guess1','guess2','guess3','img-holder');

//stats for the game
var correctAnswers = 0; 
var incorrectAnswers = 0;
var incompleteAnswers = 0;

var currentQuestion = {};
//creates a new question + answers 
function addQuestion(question,answer,guess1,guess2,guess3,image){
    obj = {
        question: question,
        title: answer,
        answer1: guess1,
        answer2: guess2,
        answer3: guess3,
        img: image
    }
    questions_array.push(obj);
}
//selects random question & removes that question from array & returns random placement of answers
function randomDisplay(array){
    //selects random question
    var random = Math.floor(Math.random()*array.length);
    var display_question = array[random];

    //removes it from array to prevent repeats
    questions_array.splice(random,1);
    //function to display information on html
    displayQuestion(display_question);
}
//function to write how elements will be displayed and sets current question 
function displayQuestion(obj){
    currentQuestion = obj;
    $('.question').text(obj.question);
    $('.guess_box').text('');
    // array to simulate random placement
    var random_array = [1,2,3,4];
    var random_selector = Math.floor(Math.random()*random_array.length);
    var letter = 1; //simulates to put A B C D before guess
    
    for(i=0; i < 4;i++){
        if(random_array[random_selector] === 4){
            $('.guess_box').append(guess(obj.title,letter));
            random_array.splice(random_selector,1);
            letter++; 
        } else if (random_array[random_selector] === 1){
            $('.guess_box').append(guess(obj.answer1,letter));
            random_array.splice(random_selector,1);
            letter++;
        } else if (random_array[random_selector] ===2){
            $('.guess_box').append(guess(obj.answer2,letter));
            random_array.splice(random_selector,1);
            letter++;
        } else if (random_array[random_selector] === 3){
            $('.guess_box').append(guess(obj.answer3,letter));
            random_array.splice(random_selector,1);
            letter++;
        } else{
            console.log('ERROR IN DISPLAYQUESTION WHILE LOOP')
        }
        
        //console.log(random_array[random_selector]);
        random_selector = Math.floor(Math.random()*random_array.length);
    }

}
//displays A B C D before the guess;
function guess(guess,letter){
    //determines what to put before answer;
    var x = letter;
    if (x === 1){
        x = "A: "
    } else if ( x === 2){
        x = "B: ";
    } else if (x === 3){
        x = "C: ";
    } else if (x === 4){
        x = "D: ";
    } else {
        x ="ERROR: ";
    }

    return `<div class="guess"> ${x} ${guess}</div>`
}


function myTimer(timer){
    var remaining_time = timer;
    setInterval(function(){
        if(remaining_time > 0){
            remaining_time--;
            $('.timer').text(remaining_time);
        } else {
            clearInterval(this);
            displayQuestionResult('outoftime');
        }
    },1000);
};
//tells user if they guessed wrong/right or out of time
function displayQuestionResult(guess){
    var displayOutofTime= $(
        `<button id='next'>Next Question</button>
        <div class='question'>You Ran Out of Time!</div>
        <p>insert possible image here</p>`
        )

    var displayWrong = $(
        `<button id='next'>Next Question</button>
        <div class='question'>You Were Wrong!</div>
        <p>insert possible image here</p>`
        )

    var displayCorrect = $(
        `<button id='next'>Next Question</button>
        <div class='question'>You Were Correct!</div>
        <p>insert possible image here</p>`
        )
    $('.trivia_box').empty();
    if(guess === true){
        $('.trivia_box').append(displayCorrect);
        correctAnswers++;
    } else if ( guess === false){
        incorrectAnswers++;
        $('.trivia_box').append(displayWrong);
    } else if (guess === 'outoftime'){
        incompleteAnswers++;
        $('.trivia_box').append(displayOutofTime);
    }
}
//actions done when time runs out.
function outOfTime(){

}
//function to check what user guessed
function checkAnswers(answer){
    answer = answer.split('  ');
    answer = answer[1];
    console.log(answer);
    if(answer === currentQuestion.title){
        displayQuestionResult(true);
    }else{
        displayQuestionResult(false);
    };
}

//runs each question
function runQuestion(){
    remaining_time = 5;
    randomDisplay(questions_array);
    $('.timer').text(remaining_time);

    myTimer(remaining_time);
}   

//starts game, starts time, pulls questions/answers as long as question array has questions
function startGame(){
    runQuestion()
}


//start button
$('#start_button').on('click',function(){
    startGame();
    this.remove();
})

//when user takes guess, checks answer displays results
$(document).on('click', '.guess',function(){
    checkAnswers($(this).text());
})