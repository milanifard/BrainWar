///* first load th page colore 3 squers randomly *///
window.onload = function()
{
    while(x.length<3)
    {
        y = Math.floor(Math.random() * 9);
        if(!x.includes(y))
            x.push(y);
    }

    console.log(x);
    for(i = 0; i<3 ;i++)
    {
        document.getElementById(x[i]).style.backgroundColor = "blue";
    }
};

x = [];
input = [] ;
trueAnswers = 0 ;
falseAnswers = 0;
counter = 0;
canClick = false;
canClickmemorized = true;
var lastrotate = -180;

///* this function color 3 squers randomly*///
function random()
{
    canClick = false;
    canClickmemorized = false;
    while(x.length<3)
    {
        y = Math.floor(Math.random() * 9);
        if(!x.includes(y))
            x.push(y);
    }

    console.log(x);
    for(i = 0; i<3 ;i++)
    {
        document.getElementById(x[i]).style.backgroundColor = "blue";
    }
    canClickmemorized = true;
}

///* this function rotate the block*///
function rotate()
{
    canClick =false;
    if(canClickmemorized)
    {
        if(x.length=== 3)
        {
            for(i = 0; i<3 ;i++)
            {
                document.getElementById(x[i]).style.backgroundColor = "grey";
            }

            y = [90 , 180 , -90] ;
            degree = y[Math.floor(Math.random() *3)];
            while(degree ===lastrotate)
                degree = y[Math.floor(Math.random() *3)];
            lastrotate = degree;
            console.log("degree :" + degree);
            document.getElementById("big").style.WebkitTransitionDuration= "0.8s";
            document.getElementById("big").style.transform = "rotate("+degree+"deg)";
        }
    }
    canClickmemorized = false;
    canClick = true;
}

///* this functin checks that we choose right squers for answer*///
function checkAnswer(id)
{

    if(canClick)
    {
        input.push(id);
        if (x.includes(id))
        {
            x.splice(x.indexOf(id), 1);
            document.getElementById(id).style.backgroundColor = "blue";
            counter++;
        }
        else
        {
            canClick = false;
            document.getElementById(id).style.backgroundColor = "red";
            falseAnswers++;
            x = [];
            counter = 0;
            setTimeout(() => {
                redcolor()
            }, 400);

        }
        if ((x.length === 0) && (counter === 3))
        {
            // stateChange();
            setTimeout(() => {greycolor()}, 300);
        }
    }
}

///* it checks if we choose wrong square color square red and call random function for new question*///
function redcolor(){
    for(i =0; i<input.length; i++)
        document.getElementById(input[i]).style.backgroundColor = "grey";
    input=[];
    random();
}

function greycolor(){
    for (i = 0; i < input.length; i++)
        document.getElementById(input[i]).style.backgroundColor = "gray";
    counter = 0;
    input = [];
    trueAnswers++;
    random();
}


var remainingTime = 60;
var elem = document.getElementById('h1');
var timer = setInterval(countdown, 1000); //set the countdown to every second


///* here we run the game for 60s*///
function countdown()
{
    if(remainingTime< 6){
        document.getElementById("header").style.backgroundColor = "beige"
        document.getElementById("header").style.transitionDuration = "5s"
        document.getElementById("header").style.boxShadow =  "10px 20px 30px  red";
    }
    if (remainingTime === 0)
    {
        clearTimeout(timer);
        canClickmemorized = false;
        canClick = false;
        var queryString = "?wrong answers: " + falseAnswers + "&correct answers: " + trueAnswers;
        window.location = "scorePage.html"  + queryString;
    }
    else
    {
        elem.innerHTML = remainingTime;
        remainingTime--;
    }
}
