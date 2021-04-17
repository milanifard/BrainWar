var abox;
var start = false;
var index;
var randomNumbers;
var score;
window.onload = function() {
    var fun = loadGame();
};
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (start) {
        if (e.keyCode == '38') {
            // up arrow
            var fun = btt();
        } else if (e.keyCode == '40') {
            // down arrow
            var fun = ttb();
        }
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function ttb() {
    if (index >= 0) {
        var fun = checkScore('low');
        abox = document.getElementsByClassName("aside layer")[index];
        index--;
        abox.classList.toggle("move-ttb");
        abox.style.visibility = "hidden";
        if (index == -1) {
            var fun = showScore();
            start = false;
        }
    }
}

function btt() {
    if (index >= 0) {
        var fun = checkScore('high');
        abox = document.getElementsByClassName("aside layer")[index];
        index--;
        abox.classList.toggle("move-btt");
        abox.style.visibility = "hidden";
        if (index == -1) {
            var fun = showScore();
            start = false;
        }
    }
}

function checkScore(value) {
    if (value == 'high') {
        if (randomNumbers[index] > randomNumbers[index + 1]) {
            score++;
        }
    } else {
        if (randomNumbers[index] < randomNumbers[index + 1]) {
            score++;
        }
    }
}

function showScore() {
    document.getElementById("div1").innerHTML += `
                <div class="aside2 layer" id="box2">
                    <h2 class="cardText">Total Score</h2>
                    <h1 class="cardText">${score} / 10</h1>
                    <div class="bottom cardText"><button class="glow-on-hover" type="button" onclick="reload()">R E S T A R T</button></div>
                </div>
  `;

}

function reload() {
    window.location.reload(false);
}

function loadGame() {
    index = 10;
    randomNumbers = [];
    score = 0;
    var i;
    for (i = 0; i < 11; i++) {
        var randomNumber = randomIntFromInterval(1, 200)
        randomNumbers.push(randomNumber);
        document.getElementById("div1").innerHTML += `
                <div class="aside layer" id="box">
                    <h2 class="cardText">${randomNumber}</h2>
                </div>
  `;
    }
    document.getElementsByClassName("glow-on-hover")[0].style.visibility = "hidden";
    document.getElementsByClassName("glow-on-hover")[1].style.visibility = "hidden";
    setTimeout(function() {
        abox = document.getElementsByClassName("aside layer")[index];
        index--;
        abox.classList.toggle("move-ttb");
        abox.style.visibility = "hidden";
        document.getElementsByClassName("glow-on-hover")[0].style.visibility = "visible";
        document.getElementsByClassName("glow-on-hover")[1].style.visibility = "visible";
        start = true;
    }, 2000);
}