
// Credit: Mateusz Rybczonec

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

const TIME_LIMIT = 50;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let randomText = 0;
let selectedBoxes = 0;
let scores = 0;
let falseSolution= 0;
var random = [];

document.getElementById("app").innerHTML = `
<div class="base-timer">
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

startTimer();
generateRandomNumber()
// startInterval()

function onTimesUp() {
  clearInterval(timerInterval);
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

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
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

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}



function generateRandomNumber() {
  var max = 9;
  var min = 1;

  for (var i = 1; i <= max; i++) {
    var temp = Math.floor(Math.floor(Math.random() * (max - min + 1)) + min);
    if (random.indexOf(temp) == -1) {
      random.push(temp);
    }
    else
      i--;
  }
  document.getElementById("p1").innerText = random[0];
  document.getElementById("p2").innerText = random[1];
  document.getElementById("p3").innerText = random[2];
  document.getElementById("p4").innerText = random[3];
  document.getElementById("p5").innerText = random[4];
  document.getElementById("p6").innerText = random[5];
  document.getElementById("p7").innerText = random[6];
  document.getElementById("p8").innerText = random[7];
  document.getElementById("p9").innerText = random[8];
  randomText = Math.floor(Math.floor(Math.random() * (20 - 1 + 1)) + 1);
  document.getElementById("numberRandomText").innerText = randomText;
  selectedBoxes = 0;
}
function computeScores() {

  if (selectedBoxes === randomText) {
    scores++;
    selectedBoxes = 0;
    falseSolution= 0;
    randomText = Math.floor(Math.floor(Math.random() * (20 - 1 + 1)) + 1);
    document.getElementById("numberRandomText").innerText = randomText;
  }
  else{

    falseSolution++;
    console.log("falseSolution",falseSolution)
  }
  if(falseSolution > 4){
    alert('دقت کن')
  }
}
function removeElement(elementId, pId) {
  // Removes an element from the document.
  var element = document.getElementById(elementId);
  var text = document.getElementById(pId).textContent;
  var number = Number(text);
  selectedBoxes += number;
  element.style.display = 'none';
  setTimeout(function () {
    //After the time is passed then I change the css display to block that appears the elements
    element.style.display = 'flex';

  }, 2000);
  computeScores()
}

