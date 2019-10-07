
//array containing all trivia questions
var questions_array = [];
addQuestion('What color of a cat is mainly associated with the commemoration of Halloween?','Black','Brown','White','None',"A black cat is associated with the celebration of Halloween. Legend has it that black cats were believed to be reincarnated witches.");
addQuestion("A superstitious practice of burying animal bones in one's front yard is meant to protect the individual from?",'Evil Spirits','Ghosts','Vampires','Witches',"here is the belief that evil spirits could be warded off if a person buries the bones of an animal at the front yard of his/her house.");
addQuestion('In Halloween, the spirit of a beloved one guarding a person is depicted by a person seeing which type of insect?','Spider','Ant','Bee','Butterfly', "A person is believed to have the spirit of a loved one guarding them when they see a spider during the celebration of Halloween.");
addQuestion('On Halloween night, a single woman will dream about her future husband if she kept what two things beneath her pillow?','A silver sixpence and a rosemary herb','A mirror and a feather','A mirror and a silver sixpence','Rosemary herb and a mirror',"If a single woman places a silver sixpence and a rosemary herb under her pillow on the night of Halloween, she will have visions about her future spouse. It is a superstitious belief that surrounds Halloween.");
addQuestion("The practice of disguisers carrying the Jack-O'-lantern during Halloween originated from which Irish myth?",'Stingy Jack','Jack the Miser','Jack the Mean','Jack the Giant Slayer',"Jack-O'-lantern originated from an Irish myth of Stingy Jack. Legend has it that Stingy Jack was the nickname of a man who after his death, was denied entrance to neither Heaven nor Hell. Jack was driven into the gloomy night. In order to brighten up his way, Jack was given a lump of burning coal, which he placed into a carved turnip.");
var timerControl;
//stats for the game
var correctAnswers = 0; 
var incorrectAnswers = 0;
var incompleteAnswers = 0;

var currentQuestion = {};
//creates a new question + answers 
function addQuestion(question,answer,guess1,guess2,guess3,more){
    obj = {
        question: question,
        title: answer,
        answer1: guess1,
        answer2: guess2,
        answer3: guess3,
        info: more
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
    timerControl = setInterval(function(){
        if(remaining_time > 0){
            remaining_time--;
            $('.timer').text(remaining_time);
            console.log(remaining_time);
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
        <div class='timer'></div>
        <div class='guess_box'></div>`
        )

    var displayWrong = $(
        `<button id='next'>Next Question</button>
        <div class='question'>You Were Wrong!</div>
        <div class='timer'></div>
        <div class='guess_box'></div>`
        )

    var displayCorrect = $(
        `<button id='next'>Next Question</button>
        <div class='question'>You Were Correct!</div>
        <div class='timer'></div>
        <div class='guess_box'></div>`
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

//function to check what user guessed
function checkAnswers(answer){
    answer = answer.split('  ');
    answer = answer[1];

    if(answer === currentQuestion.title){
        displayQuestionResult(true);
    }else{
        displayQuestionResult(false);
    };
}

//runs each question
function runQuestion(){
    remaining_time = 30;
    randomDisplay(questions_array);
    $('.timer').text(remaining_time);

    myTimer(remaining_time);
}   
//ends game, shows results,offers to do it again
function endGame(){
    var results = (
        `<div class='result-stats'>Correct Answers: ${correctAnswers}</div>
        <div class='result-stats'>Incorrect Answers: ${incorrectAnswers}</div>
        <div class='result-stats'>Incomplete Answers: ${incompleteAnswers}</div>`
    );
    var redo = (
        `<button id='try_again'>Try Again!</button>`
    )

    $('.question').text('Game is Over!');
    $('.timer').text('');
    $('.guess_box').empty();
    $('.guess_box').append(results);
    $('.trivia_box').append(redo);

    correctAnswers = 0; 
    incorrectAnswers = 0;
    incompleteAnswers = 0;

}
//`start`s game, starts time, pulls questions/answers as long as question array has questions
function startGame(){
    if(questions_array.length === 0){
        endGame();
    }else {
        runQuestion()
    }

}


//start button
$('#start_button').on('click',function(){
    startGame();
    this.remove();
})
//start button
$(document).on('click','#try_again',function(){
    addQuestion('What color of a cat is mainly associated with the commemoration of Halloween?','Black','Brown','White','None',"A black cat is associated with the celebration of Halloween. Legend has it that black cats were believed to be reincarnated witches.");
    addQuestion("A superstitious practice of burying animal bones in one's front yard is meant to protect the individual from?",'Evil Spirits','Ghosts','Vampires','Witches',"here is the belief that evil spirits could be warded off if a person buries the bones of an animal at the front yard of his/her house.");
    addQuestion('In Halloween, the spirit of a beloved one guarding a person is depicted by a person seeing which type of insect?','Spider','Ant','Bee','Butterfly', "A person is believed to have the spirit of a loved one guarding them when they see a spider during the celebration of Halloween.");
    addQuestion('On Halloween night, a single woman will dream about her future husband if she kept what two things beneath her pillow?','A silver sixpence and a rosemary herb','A mirror and a feather','A mirror and a silver sixpence','Rosemary herb and a mirror',"If a single woman places a silver sixpence and a rosemary herb under her pillow on the night of Halloween, she will have visions about her future spouse. It is a superstitious belief that surrounds Halloween.");
    addQuestion("The practice of disguisers carrying the Jack-O'-lantern during Halloween originated from which Irish myth?",'Stingy Jack','Jack the Miser','Jack the Mean','Jack the Giant Slayer',"Jack-O'-lantern originated from an Irish myth of Stingy Jack. Legend has it that Stingy Jack was the nickname of a man who after his death, was denied entrance to neither Heaven nor Hell. Jack was driven into the gloomy night. In order to brighten up his way, Jack was given a lump of burning coal, which he placed into a carved turnip.");
    startGame();
    this.remove();
})
//loads up next question when next button is clicked
$(document).on('click','#next',function(){
    this.remove();
    startGame();
})
//when user takes guess, checks answer displays results
$(document).on('click', '.guess',function(){
    clearInterval(timerControl);
    checkAnswers($(this).text());
})