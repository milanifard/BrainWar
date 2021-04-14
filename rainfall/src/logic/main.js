const timeToString = (time) => {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);


  let formattedMM = mm.toString().padStart(2, '0');
  let formattedSS = ss.toString().padStart(2, '0');

  return `${formattedMM}:${formattedSS}`;
}


let startTime;
let elapsedTime = 0;
let timerInterval;


const update_time = (time) => {
  document.getElementById('timepassed').innerHTML = time;
}


const start = () => {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    update_time(timeToString(elapsedTime));
  }, 1000);
  showButton("PAUSE");
}

const pause = () => {
  clearInterval(timerInterval);
  showButton('PLAY');
}

const reset = () => {
  clearInterval(timerInterval);
  update_time("00:00");
  elapsedTime = 0;
  showButton('PLAY');
}


const showButton = (buttonKey) => {
  const buttonToShow = buttonKey === 'PLAY' ? playButton : pauseButton;
  const buttonToHide = buttonKey === 'PLAY' ? pauseButton : playButton;
  buttonToShow.style.display = 'block';
  buttonToHide.style.display = 'none';
}

let playButton = document.getElementById('playButton');
let pauseButton = document.getElementById('pauseButton');
let resetButton = document.getElementById('resetButton');


/**
 * game logic
 */

 const p = [];

const rainFallArea = {
  canvas : document.createElement("canvas"),
  start : () => {
    rainFallArea.context = rainFallArea.canvas.getContext("2d");
    document.getElementById('gameboard').appendChild(rainFallArea.canvas);
    rainFallArea.interval = setInterval(updateRainFallArea, 20);
  },
  clear : () => {
    rainFallArea.context.clearRect(0, 0, rainFallArea.canvas.width, rainFallArea.canvas.height);
  },
}

const startGame = () => {
  rainFallArea.start();
  p.push(addDrop(5, 5, 10, 120, 'green'));
}

const addDrop = (width, height, posx, posy, color) => {
  const temp = {};
  temp.width = width;
  temp.height = height;
  temp.x = posx;
  temp.y = posy;
  temp.update = () => {
    boardContext = rainFallArea.context;
    boardContext.fillStyle = color;
    if (temp.width < 25) {
      temp.width += 1;
    } else {
      temp.width -= 20;
    }
    boardContext.fillRect(temp.x, temp.y, temp.width, temp.height); 
  };
  return temp;
}

const addLightning = () => {

}

const updateRainFallArea = () => {
  rainFallArea.clear();
  p[0].update();
}

startGame();
/*
 * listeners
 */
playButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
