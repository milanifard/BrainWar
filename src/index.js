// This commands for index.html menu.
function startFunc (){
    /* When click (Start),Transfer from menu page to game page. */
    document.getElementById('btn-start').onclick = location.href = 'src/game.html';
}
function guideFunc (){
    /* When click (How To Play), Open 'How to Play' game image. */
    document.getElementById('guidepic').style.display = "block";
    document.getElementById('closeButton').style.display = 'block';
}
function creditFunc (){
    /* When click (Credit), Open 'Credit' details. */
    document.getElementById('credit').style.display = "block";
    document.getElementById('closeButton').style.display = 'block';
}
function closeFunc (){
    /* When click (I Found), Close 'Credit' details and 'How To Play' game image. */
    document.getElementById('guidepic').style.display = 'none';
    document.getElementById('closeButton').style.display = 'none';
    document.getElementById('credit').style.display = "none";
}
// This commands for game.html elements.
const min = 1;
let max = 6;
let index = 6;

const colors = ["#e3b50d", "#1181ce", "#59e30f", "#bf2cba",];
let block_location = [];
let circle_location = [];
let first_circle_index =0;
let round = 0;
let clickMemorizedFirstTIme = false;

// Timer Variables
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};
const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let scores = 0;
let falseSolution = 0;


function startGame(){
    // Show Timer
    document.getElementById("app").innerHTML = `
<div class="base-timer" id="timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
    )}</span>
</div>
`;
    //randomTable();
    startTimer();
    setBlocksColor();
}
function setBlocksColor() {
    for (let i = 1; i <= index; i++) {
        // Give random color to the blocks.
        block_location[i] = Math.floor(Math.random() * 4);
        document.getElementById('block' + i ).style.backgroundColor = colors[block_location[i]];
    }
    document.getElementById('btn-start-game').style.display = "none";
    document.getElementById('btn-memorized').style.display = "block";
}
function cleanBlocksColor(){
    for (let i =1; i<= index; i++){
        document.getElementById('block' + i ).style.backgroundColor = 'white';
        document.getElementById('circle' + i ).style.display = "inline-block";
    }
    clickMemorizedFirstTIme = true;
    setCirclesColor();
}
function setCirclesColor(){
    /* for different and random circles color than blocks color, I have given
     an array named place and equal copy elements of block_location then
     give random values of place to circle_location */
    let  place = block_location.slice();
    max = index;
    for (let i = 1; i <= index; i++) {
        let item =    Math.floor(Math.random() * (max - min + 1) ) + min;
        circle_location[i] = place[item];
        place.splice(item,1);
        max --;
    }
    for (let i = 1; i <= index; i++) {
        document.getElementById('circle' + i ).style.backgroundColor = colors[circle_location[i]];
    }
    circle_location.shift();
    document.getElementById('btn-memorized').style.display = "none";
}
function getInput(location){
    // Check equality of block color and circle color
    if (colors[block_location[location]] === colors[circle_location[0] ]&& circle_location.length !==0){
        first_circle_index++;
        document.getElementById('circle' + first_circle_index ).style.display = " none";
        document.getElementById('block' + location ).style.backgroundColor  = colors[block_location[location]];
        circle_location.shift();
        block_location[location] = -1;
        scores++;
    }
    else {
        falseSolution++;
    }
    // Somehow click on blocks for first time equal click on memorized
    if(circle_location.length === 0 && clickMemorizedFirstTIme === false){
        cleanBlocksColor();
    }
    // When choice true blocks, set another blocks color and circles color
    if(circle_location.length === 0 && clickMemorizedFirstTIme === true){
        randomTable();
        clickMemorizedFirstTIme = false;
        setBlocksColor();
        first_circle_index = 0;
    }
    // Continue until  times up!
}
function randomTable(){
    max = 6;
    let a = index+1;
    while(a!==max+1) {
        document.getElementById('block' + a).style.display = "inline-block";
        a++;
    }
    round++;
    if(round===2){
        round = 0;
    }
    switch (round) {
        case 0:
                index = 6;
            break;
        case 1:
            index =3;
            let j = index+1;
            while(j!==max+1) {
                document.getElementById('block' + j).style.display = " none";
                j++;
            }
            break;
         }
}
function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);
        // When times up, show Times Up menu.
        if (timeLeft === 0) {
            document.getElementById('circles').style.display = 'none';
            document.getElementById('blocks').style.display = 'none';
            document.getElementById('app').style.display = 'none';
            document.getElementById('id01').style.display = 'block';
            document.getElementById('scoreText').innerText = scores.toString();
            document.getElementById('incorrectText').innerText = falseSolution.toString();

            onTimesUp();
        }
    }, 1000);
}
function onTimesUp() {
    clearInterval(timerInterval);
}
function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}
function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}
function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

