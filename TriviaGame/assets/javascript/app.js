
//array containing all trivia questions
var questions_array = [];
addQuestion('question1','answer','guess1','guess2','guess3','img-holder');
addQuestion('question2','answer','guess1','guess2','guess3','img-holder');
addQuestion('question3','answer','guess1','guess2','guess3','img-holder');
addQuestion('question4','answer','guess1','guess2','guess3','img-holder');

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
//function to write how elements will be dispalyed
function displayQuestion(obj){
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
            console.log(remaining_time)
            remaining_time--;
            $('.timer').text(remaining_time);
        } else {
            clearInterval(this);
            
        }
    },1000);
};


function runQuestion(){
    remaining_time = 5;
    randomDisplay(questions_array);
    $('.timer').text(remaining_time);

    myTimer(remaining_time);

}   

//starts game, starts time, pulls questions/answers
function startGame(){
    runQuestion()
}



//start button
$('#start_button').on('click',function(){
    startGame();
    
})