var s=0;
var t;
var point;
var o;
var bar;
var timeout;
function operator(){
    if(s==1) {
        var a=Math.floor(Math.random()*100);
        var b=Math.floor(Math.random()*100);
        o=Math.floor(Math.random()*4)+1;

        if (o == 1) {
            var c = a + b;
            document.getElementById("opt").innerHTML = a + "<img class='help' src='help.png' >" + b + "=" + c;
        } else if (o == 2) {
            var c = a - b;
            document.getElementById("opt").innerHTML = a + "<img class='help' src='help.png' >" + b + "=" + c;
        } else if (o == 3) {
            var c = a * b;
            document.getElementById("opt").innerHTML = a + "<img class='help' src='help.png' >" + b + "=" + c;
        } else {
            var c = a / b;
            while(!isInt(c)){
                a=Math.floor(Math.random()*1000);
                b=Math.floor(Math.random()*1000);
                c = a / b;
            }
            document.getElementById("opt").innerHTML = a + "<img class='help' src='help.png' >" + b + "=" + c;
        }
    }
}
function isInt(n) {
    return n % 1 === 0;
}
function plus(){
    if(s==1) {
        if (o == 1) {
            document.getElementById("ans").innerHTML = "<img src='yes.png'>";
            point++;
            t++;
            operator();
        } else {
            document.getElementById("ans").innerHTML = "<img src='no.png'>";
            t--;
            operator();
        }
    }
}
function minu(){
    if(s==1) {
        if (o == 2) {
            document.getElementById("ans").innerHTML = "<img src='yes.png'>";
            point++;
            t++;
            operator();
        } else {
            document.getElementById("ans").innerHTML = "<img src='no.png'>";
            t--;
            operator();
        }
    }
}
function mult(){
    if(s==1) {
        if (o == 3) {
            document.getElementById("ans").innerHTML = "<img src='yes.png'>";
            point++;
            t++;
            operator();
        } else {
            document.getElementById("ans").innerHTML = "<img src='no.png'>";
            t--;
            operator();
        }
    }
}
function divi(){
    if(s==1) {
        if (o == 4) {
            document.getElementById("ans").innerHTML = "<img src='yes.png'>";
            point++;
            t++;
            operator();
        } else {
            document.getElementById("ans").innerHTML = "<img src='no.png'>";
            t--;
            operator();
        }
    }
}

function timer(){
    if(t<=0){
        clear();
    }else {
        t--;
        document.getElementById("ans").innerHTML="";
        bar.style.width=(1.66*t)+"%";
        if(t<45&&t>30){
            bar.style.backgroundColor="green";
        }else if(t<=30&&t>=15){
            bar.style.backgroundColor="darkorange";
        }else if(t<15){
            bar.style.backgroundColor="red"
        }else {
            bar.style.backgroundColor="#24B7B6";
        }
        bar.innerHTML="<span style='position: relative;top: -15px'>"+(t).toString()+"</span>";
    }
}
function clear(){
    s=0;
    clearInterval(timeout);
    document.getElementById("start").innerHTML="<button class=\"start\" onclick=\"javascript: start()\">Start!</button>";
    alert("Points :"+point);
}
function start(){
    if(s==0){
        document.getElementById("start").innerHTML="";
        document.getElementById("opticon").innerHTML="<div>\n" +
            "            <button class=\"start\" onclick=\"javascript: plus()\"><i class=\"fas fa-plus fa-2x\"></i></button>\n" +
            "            <button class=\"start\" onclick=\"javascript: minu()\"><i class=\"fas fa-minus fa-2x\"></i></button>\n" +
            "        </div>\n" +
            "        <div>\n" +
            "            <button class=\"start\" onclick=\"javascript: mult()\"><i class=\"fas fa-times fa-2x\"></i></button>\n" +
            "            <button class=\"start\" onclick=\"javascript: divi()\"><i class=\"fas fa-divide fa-2x\"></i></button>\n" +
            "        </div>"
        s=1;
        t=60;
        bar=document.getElementById("bar");
        timeout = setInterval(timer, 1000);
        point=0;
        operator();
    }
}