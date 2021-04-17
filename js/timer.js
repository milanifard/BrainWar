var remainingTime = 30;
var elem = document.getElementById('demo');
var timer = setInterval(countdown, 1000); //set the countdown to every second
function countdown() {
    if(remainingTime< 6){
        elem.style.color = "red";
    }
    if (remainingTime == 0) {
        clearTimeout(timer);
        var b = correctAnswers;
        var c = wrongAnswers;
        url = 'http://localhost:63342/untitled/Score_Page.html?' + encodeURIComponent(b)+'?'+encodeURIComponent(c);
        document.location.href = url;
    } else {
        elem.innerHTML = remainingTime;
        remainingTime--; //we subtract the second each iteration
    }
}