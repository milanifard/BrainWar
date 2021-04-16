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
  document.getElementById('curscore').innerHTML = time === '00:00' ? '00' : points;
  document.getElementById('timepassed').innerHTML = time;
  if(time === '00:10'){
    pause();
    document.getElementById('scores').innerHTML = 'score: ' + points;
    document.getElementById('accuracy').innerHTML = all === 0 ? '0%' : 'accuracy: ' + (((all - missed) / all) * 100).toFixed(2) + '%';
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
  state = true;
  gameLoop();
  showButton("PAUSE");
}

const pause = () => {
  state = false;
  simulateKeyPress();
  clearInterval(timerInterval);
  showButton('PLAY');
}

const reset = () => {
  clearInterval(timerInterval);
  update_time("00:00");
  elapsedTime = 0;
  state = false;
  showButton('PLAY');
  clearGameBoard();
  initGameBoard();
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

/* enums for diffrent positions and element type */
const posEnum = {"right" : 1, "left" : 2};
const typeEnum = {"drop" : 1, "lightning" : 2, "nothing" : 3};

Object.freeze(posEnum);
Object.freeze(typeEnum);

/* needed DOM elements and flags in order to implemenet logic */
let position = null; /*wheter pointer is left or right*/
const gameboard = document.getElementById('gameboard'); /* gameboard DIV */
const gameboardCol1 = document.getElementById('gameboardcol1'); /* left coloumn */
const gameboardCol2 = document.getElementById('gameboardcol2'); /* right coloumn */
const dropsound = document.getElementById('dropsound'); /* FX */
const lightningsound = document.getElementById('lightningsound'); /* FX */
let gameboardCol1Array = []; /* saved state of left coloumn */
let gameboardCol2Array = []; /* saved state of right coloumn */
/* variables for storing score */
let missed = 0;
let all = 0;
let points = 0;
let state = false;

/* changing lighting for indicating occurence of error */
const giveWarning = () => {
  gameboard.style.border = '1px solid #ce1212 ';
  gameboard.style.boxShadow = '0 0 0px #c5d7bd, 0 0 50px #ce1212';
}

const removeWarning = () => {
  gameboard.style.border = '1px solid #fb743e ';
  gameboard.style.boxShadow = '0 0 0px #c5d7bd, 0 0 50px #fb743e';
}


/* clearing game board for next initialization */
const clearGameBoard = () => {
  gameboardCol2.innerHTML = "";
  gameboardCol1.innerHTML = "";
  position = null;
  gameboardCol1Array = [];
  gameboardCol2Array = [];
  missed = 0;
  all = 0;
  points = 0;
  document.onkeydown = null;
}

/* filling both coloumns in a random fasion */
const initGameBoard = () => {
  document.onkeydown = null;
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

/* next two functions build modified coloumns after each move */
const drawGameBoardCol2 = () => {
  gameboardCol2.innerHTML = ' '
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
  gameboardCol1.innerHTML = ' '
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

/* main event loop */
const gameLoop = async () => {
  document.onkeydown = null;
  for(;;) {
    const moveTo = await waitingKeypress();
    if(moveTo === -1) return;
    all += 1;
    /* touching lightning */
    if(gameboardCol1Array[3] === typeEnum.lightning && moveTo === posEnum.left){
      missed += 1;
      points -= 3;
      lightningsound.cloneNode(true).play();
      giveWarning();
      setTimeout(removeWarning, 200);
      continue;
    }
    /* touching lightning */
    if(gameboardCol2Array[3] === typeEnum.lightning && moveTo === posEnum.right){
      missed += 1;
      points -= 3;
      lightningsound.cloneNode(true).play();
      giveWarning();
      setTimeout(removeWarning, 200);
      continue;
    }
    /* missing rain drop */
    if(gameboardCol1Array[3] === typeEnum.drop && moveTo === posEnum.right){
      missed += 1;
      points -= 1;
      giveWarning();
      setTimeout(removeWarning, 200);
      continue;
    }
    /* missing rain drop */
    if(gameboardCol2Array[3] === typeEnum.drop && moveTo === posEnum.left){
      missed += 1;
      points -= 1;
      giveWarning();
      setTimeout(removeWarning, 200);
      continue;
    }
    /* catching rain drops */
    if(gameboardCol1Array[3] === typeEnum.drop && moveTo === posEnum.left){
      points += 5;
      dropsound.cloneNode(true).play();
    }
    /* catching rain drops */
    if(gameboardCol2Array[3] === typeEnum.drop && moveTo === posEnum.right){
      points += 5;
      dropsound.cloneNode(true).play();
    }
    /* shifting coloumns down by one elem */
    for(let i = 3; i > 0; i -= 1){
      gameboardCol1Array[i] = gameboardCol1Array[i - 1];
      gameboardCol2Array[i] = gameboardCol2Array[i - 1];
    }

    /* generating new first row (first elemenet of two coloumns) */
    let rand1 = getRandomInt(1, 4);
    let rand2 = getRandomInt(1, 4);
    
    /* checking for illegal generation */
    while(rand1 === rand2 && (rand1 === typeEnum.lightning || rand1 === typeEnum.drop)){
      rand1 = getRandomInt(1, 4);
      rand2 = getRandomInt(1, 4);
    }

    gameboardCol1Array[0] = rand1;
    drawGameBoardCol1();
    gameboardCol2Array[0] = rand2;
    drawGameBoardCol2();
    /* termination on timeout */
    if(!state) {
      return;
    }
  }
}

/*
 * listeners
 */

/* code of arrow keys */
const leftArrow = 37;
const rightArrow = 39;
playButton.addEventListener('click', debounce(start, 300));
pauseButton.addEventListener('click', debounce(pause, 300));
resetButton.addEventListener('click', debounce(reset, 300));

const waitingKeypress = () => {
  return new Promise((resolve) => {
    document.addEventListener('keydown', onKeyHandler);
    function onKeyHandler(e) {
      /* check for arrow keys being pressed only when state is true, aka, game is being played */
      if (e.keyCode === leftArrow && state) {
        document.removeEventListener('keydown', onKeyHandler);
        resolve(posEnum.left);
      } else if (e.keyCode === rightArrow && state) {
        document.removeEventListener('keydown', onKeyHandler);
        resolve(posEnum.right);
      } else {
        resolve(-1);
      }
    }
  });
}

function debounce(callback, wait) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

function simulateKeyPress() {
  var keyboardEvent = document.createEvent('KeyboardEvent');
  var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

  keyboardEvent[initMethod](
    'keydown', // event type: keydown, keyup, keypress
    true, // bubbles
    true, // cancelable
    window, // view: should be window
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    leftArrow, // keyCode: unsigned long - the virtual key code, else 0
    0, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
  );
  document.dispatchEvent(keyboardEvent);
}
/**
 * init function calls
 */

 clearGameBoard();
 initGameBoard();
 window.onload = () => {
   document.getElementById('showpopupinfo').click();
 };
