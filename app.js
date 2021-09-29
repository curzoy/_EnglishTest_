var getWords = async () => {
    let uri = "https://script.google.com/macros/s/AKfycbymcY9hiCa73Dab919Ip25ERMryzIOAlKB-a9LaQV2IykXqcDxrigeqpn8Dxk2INhHn/exec";
    var res = await fetch(uri);
    questions = await res.json();
NextQuestion();
}

let isSelected = false;

let words = [{count:0,right:0},{count:0,right:0},{count:0,right:0},{count:0,right:0},{count:0,right:0},{count:0,right:0}]

let questions = [];
let question = [];

let currentQuestionAnswer;

let options = [];

let indexNumber = 0;

let wrongAttempt = 0;
let questionNumber = 0;
let currentQuestionLevel = 0;


window.addEventListener("DOMContentLoaded", () => getWords());

function handleQuestions(){
if(questionNumber === 2){
    if(wrongAttempt > 1){
        if(currentQuestionLevel != 0){currentQuestionLevel--;}
    }
    else if (wrongAttempt === 0){
        if(currentQuestionLevel != 5){currentQuestionLevel++;}
    }
    questionNumber = 0;
    wrongAttempt = 0;
}
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
RadioButtonsState(false)
document.getElementById('myBar').innerHTML =  (indexNumber+1)+"/25";
document.getElementById('myBar').style.width = ((indexNumber+1)/25)*100+"%";
document.getElementById('word').innerHTML = "The meaning of <u>"+question.word+"</u> is?";
document.getElementById("select-one-label").innerHTML = options[0];
document.getElementById("select-two-label").innerHTML = options[1];
document.getElementById("select-three-label").innerHTML = options[2];
document.getElementById("select-four-label").innerHTML = options[3];
document.getElementById("option-1").value = options[0];
document.getElementById("option-2").value = options[1];
document.getElementById("option-3").value = options[2];
document.getElementById("option-4").value = options[3];

}


function skipQuestion(){
indexNumber++;
RadioButtonsState(true);
    if (indexNumber < 25) {
        NextQuestion();
        
    }
    else {
        Result();
    }
    resetOptionBackground()
    unCheckRadioButtons()
words[currentQuestionLevel].count++;
}

function handleNextQuestion() {
RadioButtonsState(true)
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
        words[currentQuestionLevel].right++;
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
var text = "";
if(vocabulary < 6000)
text = "Your english level is like a 9 years old child in us";
if(vocabulary < 9000 && vocabulary > 6000)
text = "Your english level is like a 15 years child old in us";
if(vocabulary < 12000 && vocabulary > 9000)
text = "25% of adults in the U.S have vocabularies of this size";
if(vocabulary < 18000 && vocabulary > 12000)
text = "Most adults have vocabularies in this range";
if(vocabulary < 24000 && vocabulary > 18000)
text = "Most college graduates and professional people";
if(vocabulary > 24000)
text = "People at the top levels of their professions";
document.getElementById('level').innerHTML = text;

document.getElementById('content').style.display = "none";
document.getElementById('btn').style.display = "block";
document.querySelector('body').style.backgroundColor = "black";
document.querySelector('html').style.backgroundColor = "black";
document.getElementById('level').style.display = "block";
ProgressBar((vocabulary/24000)*100,vocabulary);
}

function refreshPage(){
window.location.reload();
} 

function resetOptionBackground() {
const options = document.getElementsByName("select");
options.forEach((option) => {
  document.getElementById(option.labels[0].id).style.backgroundColor = ""
  document.getElementById(option.labels[0].id).style.color = ""
  document.getElementById(option.labels[0].id).style.borderColor  = ""
})
}

function RadioButtonsState(state) {
const options = document.getElementsByName("select");
for (let i = 0; i < options.length; i++) {
    options[i].disabled= state;
}
}


function ProgressBar(value,voc) {
var can = document.getElementById('canvas'),
    spanProcent = document.getElementById('procent'),
     c = can.getContext('2d');

var posX = can.width / 2,
    posY = can.height / 2,
    fps = 1000 / 200,
    procent = 0,
    oneProcent = 360 / 100,
    result = oneProcent * value;

c.lineCap = 'round';
arcMove();

function arcMove(){
  var deegres = 0;
  var acrInterval = setInterval (function() {
    deegres += 1;
    c.clearRect( 0, 0, can.width, can.height );
    procent = deegres / oneProcent;

    spanProcent.innerHTML = voc.toFixed();

    c.beginPath();
    c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
    c.strokeStyle = '#ffffffa4';
    c.lineWidth = '10';
    c.stroke();

    c.beginPath();
    c.strokeStyle = '#ffffff';
    c.lineWidth = '10';
    c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
    c.stroke();
    if( deegres >= result ) clearInterval(acrInterval);
  }, fps);
  
}


}
