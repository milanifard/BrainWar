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
  document.getElementById('curscore').innerHTML = points;
  document.getElementById('timepassed').innerHTML = time;
  if(time === '00:10'){
    pause();
    document.getElementById('scores').innerHTML = 'score: ' + points;
    document.getElementById('accuracy').innerHTML = 'accuracy: ' + (((all - missed) / all) * 100).toFixed(2) + '%';
    document.getElementById('showpopup').click();
    reset();
  }
}


const start = () => {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    update_time(timeToString(elapsedTime));
  }, 1000);
  clearGameBoard();
  initGameBoard();
  state = true;
  gameLoop();
  showButton("PAUSE");
}

const pause = () => {
  state = false;
  clearInterval(timerInterval);
  showButton('PLAY');
}

const reset = () => {
  const temp = document.getElementById('curscore');
  temp.innerHTML = '00';
  clearInterval(timerInterval);
  update_time("00:00");
  elapsedTime = 0;
  state = false;
  showButton('PLAY');
  clearGameBoard();
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
* game utils
*/
const getRandomInt = (min, max) => {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* game logic
*/

const posEnum = {"right" : 1, "left" : 2};
const typeEnum = {"drop" : 1, "lightning" : 2, "nothing" : 3};

Object.freeze(posEnum);
Object.freeze(typeEnum);

let position = null;
const gameboard = document.getElementById('gameboard');
const gameboardCol1 = document.getElementById('gameboardcol1');
const gameboardCol2 = document.getElementById('gameboardcol2');
const dropsound = document.getElementById('dropsound');
const lightningsound = document.getElementById('lightningsound');
const gameboardCol1Array = [];
const gameboardCol2Array = [];
let missed = 0;
let all = 0;
let points = 0;
let state = false;

const giveWarning = () => {
  gameboard.style.border = '1px solid #ce1212 ';
  gameboard.style.boxShadow = '0 0 0px #c5d7bd, 0 0 50px #ce1212';
}

const removeWarning = () => {
  gameboard.style.border = '1px solid #fb743e ';
  gameboard.style.boxShadow = '0 0 0px #c5d7bd, 0 0 50px #fb743e';
}


const clearGameBoard = () => {
  gameboardCol2.innerHTML = '';
  gameboardCol1.innerHTML = '';
  position = null;
  for(let i = 0; i < 4; i += 1){
    try{
      gameboardCol1Array.pop();
      gameboardCol2Array.pop();
    } catch (e){}
  }
  missed = 0;
  all = 0;
  points = 0;
}

const initGameBoard = () => {
  for(let i = 0; i < 4; i += 1){
    let rand1 = getRandomInt(1, 4);
    let rand2 = getRandomInt(1, 4);
    while(rand1 === rand2 && (rand1 === typeEnum.lightning || rand1 === typeEnum.drop)){
      rand1 = getRandomInt(1, 4);
      rand2 = getRandomInt(1, 4);
    }
    
    gameboardCol1Array.push(rand1);
    gameboardCol2Array.push(rand2);
    if(rand1 === typeEnum.drop){
      gameboardCol1.innerHTML += `
              <div class="row" id="elem1${i}">
                <img class="drop img-fluid" src="src/static/drop.png" />
              </div>
              `;
    } else if(rand1 === typeEnum.lightning){
      gameboardCol1.innerHTML += `
              <div class="row" id="elem1${i}">
                <img class="drop img-fluid" src="src/static/lightning.png" />
              </div>
              `;
    } else{
      gameboardCol1.innerHTML += `
            <div class="row drop" id="elem1${i}">
            </div>
            `;
    }
    if(rand2 === typeEnum.drop){
      gameboardCol2.innerHTML += `
              <div class="row" id="elem2${i}">
                <img class="drop img-fluid" src="src/static/drop.png" />
              </div>
              `;
    } else if(rand2 === typeEnum.lightning){
      gameboardCol2.innerHTML += `
              <div class="row" id="elem2${i}">
                <img class="drop img-fluid" src="src/static/lightning.png" />
              </div>
              `;
    } else{
      gameboardCol2.innerHTML += `
            <div class="row drop" id="elem2${i}">
            </div>
            `;
    }
  }
};

const drawGameBoardCol2 = () => {
  gameboardCol2.innerHTML = ''
  for(let i = 0; i < 4; i += 1){
    if(gameboardCol2Array[i] === typeEnum.drop){
      gameboardCol2.innerHTML += `
              <div class="row" id="elem2${i}">
                <img class="drop img-fluid" src="src/static/drop.png" />
              </div>
              `;
    } else if(gameboardCol2Array[i] === typeEnum.lightning){
      gameboardCol2.innerHTML += `
              <div class="row" id="elem2${i}">
                <img class="drop img-fluid" src="src/static/lightning.png" />
              </div>
              `;
    } else{
      gameboardCol2.innerHTML += `
            <div class="row drop" id="elem2${i}">
            </div>
            `;
    }
  }
}

const drawGameBoardCol1 = () => {
  gameboardCol1.innerHTML = ''
  for(let i = 0; i < 4; i += 1){
    if(gameboardCol1Array[i] === typeEnum.drop){
      gameboardCol1.innerHTML += `
              <div class="row" id="elem1${i}">
                <img class="drop img-fluid" src="src/static/drop.png" />
              </div>
              `;
    } else if(gameboardCol1Array[i] === typeEnum.lightning){
      gameboardCol1.innerHTML += `
              <div class="row" id="elem1${i}">
                <img class="drop img-fluid" src="src/static/lightning.png" />
              </div>
              `;
    } else{
      gameboardCol1.innerHTML += `
            <div class="row drop" id="elem1${i}">
            </div>
            `;
    }
  }
}

const gameLoop = async () => {
  for(;;) {
    if(!state){
      setTimeout(gameLoop, 200);
      return;
    } 
    const moveTo = await waitingKeypress();
    all += 1;
    if(gameboardCol1Array[3] === typeEnum.lightning && moveTo === posEnum.left){
      missed += 1;
      points -= 3;
      lightningsound.cloneNode(true).play();
      giveWarning();
      setTimeout(removeWarning, 200);
      continue;
    }
    if(gameboardCol2Array[3] === typeEnum.lightning && moveTo === posEnum.right){
      missed += 1;
      points -= 3;
      lightningsound.cloneNode(true).play();
      giveWarning();
      setTimeout(removeWarning, 200);
      continue;
    }
    if(gameboardCol1Array[3] === typeEnum.drop && moveTo === posEnum.right){
      missed += 1;
      points -= 1;
      giveWarning();
      setTimeout(removeWarning, 200);
      continue;
    }
    if(gameboardCol2Array[3] === typeEnum.drop && moveTo === posEnum.left){
      missed += 1;
      points -= 1;
      giveWarning();
      setTimeout(removeWarning, 200);
      continue;
    }
    if(gameboardCol1Array[3] === typeEnum.drop && moveTo === posEnum.left){
      points += 5;
      dropsound.cloneNode(true).play();
    }
    if(gameboardCol2Array[3] === typeEnum.drop && moveTo === posEnum.right){
      points += 5;
      dropsound.cloneNode(true).play();
    }
    for(let i = 3; i > 0; i -= 1){
      gameboardCol1Array[i] = gameboardCol1Array[i - 1];
      gameboardCol2Array[i] = gameboardCol2Array[i - 1];
    }

    let rand1 = getRandomInt(1, 4);
    let rand2 = getRandomInt(1, 4);
    
    while(rand1 === rand2 && (rand1 === typeEnum.lightning || rand1 === typeEnum.drop)){
      rand1 = getRandomInt(1, 4);
      rand2 = getRandomInt(1, 4);
    }

    gameboardCol1Array[0] = rand1;
    drawGameBoardCol1();
    gameboardCol2Array[0] = rand2;
    drawGameBoardCol2();
    if(!state){
      setTimeout(gameLoop, 200);
      return;
    }
  }
}

/*
 * listeners
 */

const leftArrow = 37;
const rightArrow = 39;
playButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

function waitingKeypress() {
  return new Promise((resolve) => {
    document.addEventListener('keydown', onKeyHandler);
    function onKeyHandler(e) {
      if (e.keyCode === leftArrow) {
        document.removeEventListener('keydown', onKeyHandler);
        resolve(posEnum.left);
      } else if (e.keyCode === rightArrow) {
        document.removeEventListener('keydown', onKeyHandler);
        resolve(posEnum.right);
      }
    }
  });
}


/**
 * function calls
 */

