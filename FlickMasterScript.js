function ReplacingImage(imgName){

    document.getElementById("imgArrow").src=imgName

}

ReplacingImage(blue-up.png)

var redUp = document.createElement("redUp");
redUp.src = "red-up.png";
var src = document.getElementById("arrow");
src.appendChild(redUp);

var redDown = document.createElement("redDown");
redDown.src = "red-down.png";
var src = document.getElementById("arrow");
src.appendChild(redDown);

var redLeft = document.createElement("redLeft");
redLeft.src = "red-left.png";
var src = document.getElementById("arrow");
src.appendChild(redLeft);

var redRight = document.createElement("redRight");
redRight.src = "red-right.png";
var src = document.getElementById("arrow");
src.appendChild(redRight);

var blueUp = document.createElement("blueUp");
blueUp.src = "blue-up.png";
var src = document.getElementById("arrow");
src.appendChild(blueUp);

var blueDown = document.createElement("blueDown");
blueDown.src = "blue-down.png";
var src = document.getElementById("arrow");
src.appendChild(blueDown);

var blueLeft = document.createElement("blueLeft");
blueLeft.src = "blue-left.png";
var src = document.getElementById("arrow");
src.appendChild(blueLeft);

var blueRight = document.createElement("blueRight");
blueRight.src = "blue-right.png";
var src = document.getElementById("arrow");
src.appendChild(blueRight);

var whiteUp = document.createElement("whiteUp");
whiteUp.src = "white-up.png";
var src = document.getElementById("choice1");
src.appendChild(whiteUp);

var whiteDown = document.createElement("whiteDown");
whiteDown.src = "white-down.png";
var src = document.getElementById("choice2");
src.appendChild(whiteDown);

var whiteLeft = document.createElement("whiteLeft");
whiteLeft.src = "white-left.png";
var src = document.getElementById("choice3");
src.appendChild(whiteLeft);

var whiteRight = document.createElement("whiteRight");
whiteRight.src = "white-right.png";
var src = document.getElementById("choice4");
src.appendChild(whiteRight);