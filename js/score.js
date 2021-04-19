window.onload = function () {
    var url = document.location.href;
    var correct = url.split('?')[1];
    var  wrong = url.split('?')[2];

    document.getElementById('p1').innerHTML = "Correct Answers: "+correct;
    document.getElementById('p2').innerHTML = "Wrong Answers: "+wrong;

    document.getElementById('p3').innerHTML = "Accuracy: "+ ((correct/(parseInt(correct)+parseInt(wrong)))*100).toFixed(2)+'%';
    document.getElementById('p4').innerHTML = "Mean Time: "+ (30/correct).toFixed(2) +'s';
}