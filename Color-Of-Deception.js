

var Colors = [["yellow",1],["red",2],["black",3],["green",4],["blue",5],["white",6],["pink",7],["brown",8],["orange",9],["grey",10]];



function toggli(){
    var username = document.getElementById('enterusername').value;
    var age = document.getElementById('enterage').value;
    _Score = 0;
    document.getElementById('score').innerText = _Score;
    document.getElementById('navfirst').style.display = 'none';
    document.getElementById('navsecond').style.display = 'block';
    document.getElementById('name').innerText = username;
    document.getElementById('timer').innerText = age;
    startTimer(15,document.getElementById('timer'));
    //document.body.style.backgroundColor = "black";
    document.getElementById('start').style.display = 'none';
    document.getElementById('box').style.display = 'block';
    ChangeColor();
}

var _CorrectColor = 1
var _Score = 0
var _IntervalId = 0

function startTimer(duration, display) {
    console.log("in jsfkdsf");
    var timer = duration, minutes, seconds;
    _IntervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        if(seconds == 0)
        {
            display.innerHTML = "Times Up !"; 
            document.getElementById('finish').innerText = "Times Up ! Your Score Is : " + _Score;
            document.getElementById('box').style.display = 'none';
            document.getElementById('start').style.display = 'block';
            _Score = 0;
            clearInterval(_IntervalId);
        }
        display.innerHTML = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    },1000);
}

function ChangeColor(){
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
    btn1.style.color = "black";
    btn2.style.color = "black";
    var rand = GenerateRandome();
    if(rand > 5)
    {
        var temp = GenerateRandome();
        if(temp == 2)
        {
            btn1.style.color = "white";
        }
        console.log("color temp  =" + Colors[temp][0]);
        btn1.style.backgroundColor = Colors[temp][0];
        btn1.innerText = Colors[temp][0];
        _CorrectColor = 1;

        var temp2 = GenerateRandomeExcept(temp);
        var temp3 = GenerateRandomeExcept(temp2);
        btn2.style.backgroundColor = Colors[temp2][0];
        btn2.innerText = Colors[temp3][0];
    }
    else{
        var temp = GenerateRandome();
        if(temp == 2)
        {
            btn2.style.color = "white";
        }
        console.log("temp is" + temp);
        console.log("color temp  =" + Colors[temp][0]);
        btn2.style.backgroundColor = Colors[temp][0];
        btn2.innerText = Colors[temp][0];
        _CorrectColor = 2;

        var temp2 = GenerateRandomeExcept(temp);
        var temp3 = GenerateRandomeExcept(temp2);
        btn1.style.backgroundColor = Colors[temp2][0];
        btn1.innerText = Colors[temp3][0];
    }
    
}


function checkcolor(btnnumber) {
    var Score = document.getElementById('score');
    if(btnnumber == _CorrectColor)
    {
        _Score +=1;
        Score.innerText = _Score;
        ChangeColor();
    }
    else{
        _Score -=1;
        Score.innerText = _Score;
        ChangeColor();
    }
}

function GenerateRandome(){
    return (Math.floor((Math.random() * 10) + 1) - 1);
}

function GenerateRandomeExcept(number){
    var temp = 0
    do{
        temp =  Math.floor((Math.random() * 10) + 1) - 1;
    }while(temp == number)
    return temp;
}