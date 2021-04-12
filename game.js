
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

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let randomText = 0;
let selectedBoxes = 0;
let scores = 0;
let falseSolution = 0;
var random = [];

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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
      document.getElementById('id01').style.display = 'block';
      document.getElementById('scoreText').innerText = scores;
      document.getElementById('incorrectText').innerText = falseSolution;

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


// generate random number for complete boxes
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
  randomText = Math.floor(Math.floor(Math.random() * (13 - 1 + 1)) + 1);
  document.getElementById("numberRandomText").innerText = randomText;
  selectedBoxes = 0;
}

// compute scores for player and warning if false solution selected gt 4
function computeScores() {

  if (selectedBoxes === randomText) {
    scores++;
    selectedBoxes = 0;
    falseSolution = 0;
    randomText = Math.floor(Math.floor(Math.random() * (13 - 1 + 1)) + 1);
    document.getElementById("numberRandomText").innerText = randomText;
  }
  else if (selectedBoxes > randomText) {
    selectedBoxes = 0;
    falseSolution ++;
    randomText = Math.floor(Math.floor(Math.random() * (13 - 1 + 1)) + 1);
    document.getElementById("numberRandomText").innerText = randomText;
  }

}
function removeElement(elementId, pId) {
  // Removes an element from the document.
  var element = document.getElementById(elementId);
  var text = document.getElementById(pId).textContent;
  var number = Number(text);
  console.log("number", number)
  selectedBoxes += number;
  element.style.opacity = 0;
  setTimeout(function () {
    //After the time is passed then I change the css flex to block that appears the elements
    element.style.opacity = 1;
  }, 2000);
  computeScores()
}

function closeModal() {
  document.getElementById('id01').style.display = 'none';
}

// animation js
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});