var correctAnswers = 0;
var wrongAnswers = 0;

function display_random_image()
{
    var theImages = [{
        src: "images/blue-paper.png",
    }, {
        src: "images/blue-rock.png",
    }, {
        src: "images/blue-scissors.png",
    }, {
        src: "images/red-paper.png",
    }, {
        src: "images/red-rock.png",
    }, {
        src: "images/red-scissors.png",
    }];

    var preBuffer = [];
    for (var i = 0, j = theImages.length; i < j; i++) {
        preBuffer[i] = new Image();
        preBuffer[i].src = theImages[i].src;
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
    obj.style.width = "257px";
    obj.style.height = "239px";
// display the image
}
function test1() {
    var obj = document.getElementById("bimg");
    if ((obj.src == "http://localhost:63342/untitled/images/blue-scissors.png") || (obj.src == "http://localhost:63342/untitled/images/red-paper.png")) {
        correctAnswers++;
        display_random_image();
    }
    else wrongAnswers++;
}
function test2() {
    var obj = document.getElementById("bimg");
    if ((obj.src == "http://localhost:63342/untitled/images/blue-rock.png") || (obj.src == "http://localhost:63342/untitled/images/red-scissors.png")) {
        correctAnswers++;
        display_random_image();
    }
    else wrongAnswers++;
}
function test3() {
    var obj = document.getElementById("bimg");
    if ((obj.src == "http://localhost:63342/untitled/images/red-rock.png") || (obj.src == "http://localhost:63342/untitled/images/blue-paper.png")) {
        correctAnswers++;
        display_random_image();
    }
    else wrongAnswers++;
}