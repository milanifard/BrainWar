var correctAnswers = 0;
var wrongAnswers = 0;

function display_random_image()
{
    var theImages = [{
        src: "images/blue-paper.png",
        value: "blue-paper"
    }, {
        src: "images/blue-rock.png",
        value: "blue-rock"
    }, {
        src: "images/blue-scissors.png",
        value: "blue-scissors"
    }, {
        src: "images/red-paper.png",
        value: "red-paper"
    }, {
        src: "images/red-rock.png",
        value: "red-rock"
    }, {
        src: "images/red-scissors.png",
        value: "red-scissors"
    }];

    var preBuffer = [];
    for (var i = 0, j = theImages.length; i < j; i++) {
        preBuffer[i] = new Image();
        preBuffer[i].src = theImages[i].src;
        preBuffer[i].value = theImages[i].value;
    }

// create random image number
    function getRandomInt(min,max)
    {
        //  return Math.floor(Math.random() * (max - min + 1)) + min;

        imn = Math.floor(Math.random() * (max - min + 1)) + min;
        return imn ;
    }

// 0 is first image,   preBuffer.length - 1) is  last image

    var newImage = getRandomInt(0, preBuffer.length - 1);
// remove the previous images
    var obj = document.getElementById('bimg');
    obj.src = preBuffer[newImage].src ;
    obj.name = preBuffer[newImage].value;
    obj.style.width = "267px";
    obj.style.height = "267px";
// display the image
}
function test1() {
    var obj = document.getElementById("bimg");
    if ((obj.name == "blue-scissors") || (obj.name == 'red-paper')) {
        correctAnswers++;
        display_random_image();
    }
    else wrongAnswers++;
}
function test2() {
    var obj = document.getElementById("bimg");
    if ((obj.name == "blue-rock") || (obj.name == "red-scissors")) {
        correctAnswers++;
        display_random_image();
    }
    else wrongAnswers++;
}
function test3() {
    var obj = document.getElementById("bimg");
    if ((obj.name == "red-rock") || (obj.name == "blue-paper")) {
        correctAnswers++;
        display_random_image();
    }
    else wrongAnswers++;
}