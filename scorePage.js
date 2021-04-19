var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");
document.getElementById('wrong').innerHTML = lengthOfName = queries[0];
document.getElementById('right').innerHTML = lengthOfName = queries[1];

function gamepage(){
    window.location = "gamePage.html";
}

function indexpage(){
    window.location = "index.html";
}
