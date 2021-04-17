var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

var rect = document.getElementById("myCanvas");
var num = 0;
var bool = false
var inn = setInterval(function move() {
    if (bool == false) { num += 1; } else { num -= 1 }

    if (bool == false) {
        rect.style.marginLeft = num + "px";
        rect.style.marginTop = num + "px";
    }
    if (num >= 10) {
        bool = true;
    }
    if (num <= 0) {
        bool = false;
    }
}, 50);
var inn2 = setInterval(function move() {
    if (bool == false) {
        rect.style.marginLeft = num + "px";
        rect.style.marginTop = num + "px";
    }
}, 50);