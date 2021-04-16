// an array that include amount of the correct and wrong answer
var queryString = [];

// a variable for changing amount of bar
var r = document.querySelector(':root');


// calculate the percent of the result of the game
function calculate(){
    // store amount correct answers
    var a=parseInt(queryString['correct']);
    
    // store amount wrong answers
    var b=parseInt(queryString['wrong']);
    
    // calculate the percent
    const percent = 100 * (a / (a+b));
    // console.log(percent)
    
    // changing color and amount of the bar
    // when you didnt answer to any question or the amount of the correct is 0
    if(isNaN(percent) || percent === 0){
        r.style.setProperty("--width", "0%");
        r.style.setProperty("--color", '#000000');
    }
    // when the percent less or equal than 5
    else if (percent <= 5){
        r.style.setProperty('--color', '#f63a0f');
    }
    // when the percent less or equal than 25
    else if (percent <= 25){
        r.style.setProperty('--color', '#f27011');
    }
    // when the percent less or equal than 50
    else if (percent <= 50){
        r.style.setProperty('--color', '#f2b01e');
    }
    // when the percent less or equal than 75
    else if (percent <= 75){
        r.style.setProperty('--color', '#ffe549');
    }
    // when the percent less or equal than 100
    else {
        r.style.setProperty('--color', '#86e01e');
    }
    var string = percent + "%";
    r.style.setProperty("--width", string);
    // console.log(string)
}

// load the amount of the correct and wrong answers from url
window.onload = function () {
    if (queryString.length === 0) {
        // split the receive url
        if (window.location.search.split('?').length > 1) {
            var string = window.location.search.split('?')[1].split('&');
            for (var i = 0; i < string.length; i++) {
                var key = string[i].split('=')[0];
                var value = decodeURIComponent(string[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }
    if (queryString["correct"] != null && queryString["wrong"] != null) {
        var data = "<u>Result of your game</u><br /><br />";
        data += "<b>Correct:</b> " + queryString["correct"] + " <b>Wrong:</b> " + queryString["wrong"];

        // call the calculate function after finding amount of the correct and wrong answers
        calculate();

        // show the amounts
        document.getElementById("result-para").innerHTML = data;
    }
};