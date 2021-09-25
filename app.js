var getWords = async () => {
        let uri = "https://script.google.com/macros/s/AKfycbymcY9hiCa73Dab919Ip25ERMryzIOAlKB-a9LaQV2IykXqcDxrigeqpn8Dxk2INhHn/exec";
        var res = await fetch(uri);
        questions = await res.json();


    //console.log(questions['data'][level][0]['options']);
    NextQuestion();
}

let isSelected = false;

let words = [{count:0,right:0},{count:0,right:0},{count:0,right:0},{count:0,right:0},{count:0,right:0},{count:0,right:0}]

let questions = [];
let question = [];

let currentQuestionAnswer;

let options = [];

let indexNumber = 0;

let score = 0;
let wrongAttempt = 0;
let questionNumber = 0;
let currentQuestionLevel = 0;


window.addEventListener("DOMContentLoaded", () => getWords());

function handleQuestions(){
    if(questionNumber === 2){
        if(wrongAttempt > 1){
            if(currentQuestionLevel != 0){currentQuestionLevel--;console.log("level decreased");}
        }
        else if (wrongAttempt === 0){
            if(currentQuestionLevel != 5){currentQuestionLevel++;console.log("level increased");}
        }
        questionNumber = 0;
        wrongAttempt = 0;
    }
    console.log(currentQuestionLevel);
    question = questions['data'][currentQuestionLevel][indexNumber];
    
    var opt = question['options'].split(',');
    currentQuestionAnswer = opt[0];
    opt.sort(function () {
        return Math.random() - 0.5;
    });
    options = opt.slice(0,4);
    if(!options.includes(currentQuestionAnswer)){
        options[Math.floor(Math.random()*options.length)] = currentQuestionAnswer;
    }
 
    
}

function selectOption(){
    if(isSelected){
        handleNextQuestion()
        isSelected = false;
    }
}

function optionSelected(){
    isSelected = true;
}

function NextQuestion() {
    handleQuestions();
    console.log(words);
    console.log(currentQuestionLevel);
    document.getElementById('word').innerHTML = "The meaning of "+question.word+" is?";
    document.getElementById("select-one-label").innerHTML = options[0];
    document.getElementById("select-two-label").innerHTML = options[1];
    document.getElementById("select-three-label").innerHTML = options[2];
    document.getElementById("select-four-label").innerHTML = options[3];
    document.getElementById("option-1").value = options[0];
    document.getElementById("option-2").value = options[1];
    document.getElementById("option-3").value = options[2];
    document.getElementById("option-4").value = options[3];
    
}

function handleNextQuestion() {
    checkForAnswer()
    
    
    setTimeout(() => {
        if (indexNumber < 25) {
            NextQuestion();
            
        }
        else {
            Result();
        }
        resetOptionBackground()
        unCheckRadioButtons()
    }, 1000);
    indexNumber++;
    words[currentQuestionLevel].count++;
    console.log("current questions num : "+words[currentQuestionLevel].count)
    console.log("indexNumber : "+indexNumber);
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("select");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function checkForAnswer() {
    const currentQuestion = question;
    const currentLevel = currentQuestion.level;
    const options = document.getElementsByName("select"); 
    let correctOption = null
    //Getting the Right Answer
    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })
   


    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "#91CB858F"
            document.getElementById(correctOption).style.color = "green"
            document.getElementById(correctOption).style.borderColor = "#91CB858F"
         console.log("Correct answer is " + currentQuestionAnswer);
         words[currentQuestionLevel].right++;
            score++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "#ff000038"
            document.getElementById(wrongLabelId).style.borderColor = "#ff000038"
            document.getElementById(wrongLabelId).style.color = "red"
            document.getElementById(correctOption).style.color = "green"
            document.getElementById(correctOption).style.backgroundColor = "#91CB858F"
            document.getElementById(correctOption).style.borderColor = "#91CB858F"
            console.log("wrong! ,Correct answer is " + currentQuestionAnswer);
            wrongAttempt++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

function Result(){

    var vocabulary = 0;
    words.forEach(element => {
        if(element.count == 0){
            element.count = 1;
        }
    });

    for (let i = 0; i <= 5; i++){
        if(i <= 3){
            vocabulary += (1500/words[i].count)*words[i].right;
        }
        else{
            vocabulary += (6000/words[i].count)*words[i].right;
        }
    }
    document.getElementById('vocabulary').innerHTML = "Your vocabulary size : "+vocabulary;
    console.log("vocabulary : "+vocabulary);

    /*document.getElementById('main').style.display = "none";
    document.getElementById('result').style.display = "block";
    
    document.getElementById('testLevel').innerHTML = testLevel;
    document.getElementById('level').innerHTML = level;
    document.getElementById('questionLength').innerHTML = questions.length;
    document.getElementById('score').innerHTML = Score;
    ProgressBar(total*100);
    */
}

function resetOptionBackground() {
    const options = document.getElementsByName("select");
    options.forEach((option) => {
      document.getElementById(option.labels[0].id).style.backgroundColor = ""
      document.getElementById(option.labels[0].id).style.color = ""
      document.getElementById(option.labels[0].id).style.borderColor  = ""
    })
}
