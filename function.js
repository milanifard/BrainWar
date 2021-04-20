let k;
function startTimer(duration, display) {
    var timer = duration, seconds;
    k = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = "time : "+ seconds;

        if (--timer < 0) {
            clearInterval(k);
            alert("Bad!!!");
        }
    }, 1000);
}
let mainAnswer;
window.onload = function () {
    var time = 15,
        display = document.getElementById('timer');
    startTimer(time, display);

    let firstOP = document.getElementById('firstOperator');
    let operation = document.getElementById('operation');
    let answer = document.getElementById('answer');
    let rand = getOP();
    operation.innerHTML = "&nbsp&nbsp"+rand+"&nbsp&nbsp";
    let x = getRandom(1,100);
    let y = getRandom(1,100);
    if(x<y){
        [x, y] = [y, x];
    }
    mainAnswer = y;
    let result;
    switch(rand){
        case '+':
            result =x+y;
            break;
        case '-':
            result =x-y;
            break;
        case '*':
            result =x*y; 
            break;
    }
    firstOP.innerHTML = x;
    answer.innerHTML = result;
};

//Returns a random number between min (inclusive) and max (exclusive)
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getOP(){
    rand = getRandom(1,4);
    switch(rand){
        case 1:
            return '+';
        case 2:
            return '-';
        case 3:
            return '*';   
    }
}

let userAnswer = "";
let userRecord =0;
function clicked(id){
    let secondOP = document.getElementById('secondOperator');
    let record = document.getElementById('record');
    userAnswer += id;
    let len = getlength(mainAnswer);
    secondOP.innerHTML = userAnswer;
    if(mainAnswer == userAnswer){
        alert("Excellent :)");
        record.innerHTML = "level:"+ (++userRecord);
        clearInterval(k);
    }else if (userAnswer.length > len){
        alert("Bad!");
    }
}


function getlength(number) {
    return number.toString().length;
}