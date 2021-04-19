var num = 0;
var counterH = 0;
var counterV = 0;
var counterD = 0;
var player = 0;
var tileId = 1;
var currentP = null;
var player1Img = "1.png";
var player2Img = "2.png";
var playerWinner = "3.png";
var x = 1;
var r = 1;
var tmp = 0;
var calc = 0;
var gameOn = true;

const board = $("#boardGame");


setTimeout(function (){
    $(".preloader").fadeOut("1500");
},1500);

$('.but').click(function (){
    num = $(this).text();
    $('.but').prop("disabled",true);
    $('.but').css("backgroundColor", "#cccccc");
    $('.but').css("border", "1px solid #999999");
    $('.but').css("color", "#333");

    createBoard(num,num);
});

$("#restart").click(function (){
    location.reload(true);
});

$("#homePage").click(function (){
    window.location.href='index.html';
});

//Create tiels
function createBoard(r,c){
    $("#restart").css("display","inline-block");
    $("#playerTurn").css("display","inline-block");
    $("#image").css("display","inline-block");
    for(var i = 0; i < r ; i++){
        const row = $("<div>").addClass("row");
        for(var j = 0; j < c ; j++){
            const col = $("<div>").addClass("col");
            if(num == 9){
                col.addClass("smallCol");
            }
            col.attr("id",tileId);
            tileId++;
            row.append(col);
        }
        board.append(row);
    }
}
//when a tile is clicked!
board.on("click", ".col", function(){
    if(gameOn == false){
        return;
    }
    var current = $(this);
    if(player == 0 && !current.hasClass("p1") && !current.hasClass("p2")){

        $("#playerTurn").text("Player 2's turn!");
        $("#image").attr("src","2.png");
        current.css("backgroundImage", 'url(' + player1Img + ')');
        current.css("backgroundSize", "80%");
        current.css("backgroundRepeat", "no-repeat");
        current.css("backgroundPosition", "center");
        current.addClass('p1');
        counterH = 0;
        counterV = 0;
        counterD = 0;
        hasWin("p1");
        currentP = current.attr("class");
        player = 1;
    }else if(player == 1 && !current.hasClass("p1") && !current.hasClass("p2")){
        $("#playerTurn").text("Player 1's turn!");
        $("#image").attr("src","1.png");
        current.css("backgroundImage", 'url(' + player2Img + ')');
        current.css("backgroundSize", "80%");
        current.css("backgroundRepeat", "no-repeat");
        current.css("backgroundPosition", "center");
        current.addClass('p2');
        current.addClass('selected');
        counterH = 0;
        counterV = 0;
        counterD = 0;
        hasWin("p2");
        //console.log("///////");
        currentP = current.attr("class");
        player = 0;
    }
    //alert(currentP);
});

function hasWin(currentPlayer){
    calc = 0;
    var bs = parseInt(num, 10);
    checkHorizontal(bs, currentPlayer);
    checkVertical(bs, currentPlayer);
    checkDiagonal(bs,currentPlayer);
}

function checkHorizontal(bs, currentPlayer){
    for(var m = 0 ; m < bs ; m++){
        for( var n = 1; n < bs-2 ; n++){
            for(var p=0 ; p<4 ; p++){
                calc = (bs*m) + n + p;
                //console.log(calc);
                if($("#"+calc).hasClass(currentPlayer)){
                    //console.log(calc);
                    //$("#"+calc).css("backgroundColor", "red");
                    counterH++;
                    //console.log(calc);
                }
            }
            if(counterH==4){
                //alert("You are the winner " + currentPlayer);
                $("#"+calc).css("backgroundImage", 'url(' + playerWinner + ')');
                calc--;
                $("#"+calc).css("backgroundImage", 'url(' + playerWinner + ')');
                calc--;
                $("#"+calc).css("backgroundImage", 'url(' + playerWinner + ')');
                calc--;
                $("#"+calc).css("backgroundImage", 'url(' + playerWinner + ')');

                whichPlayerWin(currentPlayer);
                gameOn = false;
                return true;
            }
            counterH = 0;
        }
    }
}

function checkVertical(bs, currentPlayer){
    //this is for vertical
    for(var m = 1 ; m < bs+1; m++){
        for( var n = 0; n < bs-3; n++){
            for(var p=0 ; p<4 ; p++){
                calc = (bs*n) + m + (bs*p);
                //console.log(calc);
                if($("#"+calc).hasClass(currentPlayer)){
                    //console.log(calc);
                    //$("#"+calc).css("backgroundColor", "red");
                    counterV++;
                    //console.log(calc);
                }
            }
            if(counterV==4){
                //alert("You are the winner " + currentPlayer);
                $("#"+calc).css("backgroundImage", 'url(' + playerWinner + ')');
                calc = calc - num;
                $("#"+calc).css("backgroundImage", 'url(' + playerWinner + ')');
                calc = calc - num;
                $("#"+calc).css("backgroundImage", 'url(' + playerWinner + ')');
                calc = calc - num;
                $("#"+calc).css("backgroundImage", 'url(' + playerWinner + ')');
                whichPlayerWin(currentPlayer);
                gameOn = false;
                return true;
            }
            counterV = 0;
        }
    }
}

function checkDiagonal(bs, currentPlayer){
    x = 1;
    r = 1;
    while(r <= bs){
        if(x < ((r*bs)-2) &&
            x <= bs*bs &&
            (x + (bs + 1)) <= bs*bs &&
            (x + (2*(bs+1))) <= bs*bs &&
            (x + (3*(bs+1))) <= bs*bs){
            if($("#"+x).hasClass(currentPlayer) &&
                $("#"+(x + (bs + 1))).hasClass(currentPlayer) &&
                $("#"+(x + (2*(bs+1)))).hasClass(currentPlayer) &&
                $("#" + (x + (3*(bs+1)))).hasClass(currentPlayer)){
                //alert("You are the winner " + currentPlayer);
                $("#"+x).css("backgroundImage", 'url(' + playerWinner + ')');
                $("#"+(x + (bs + 1))).css("backgroundImage", 'url(' + playerWinner + ')');
                $("#"+(x + (2*(bs+1)))).css("backgroundImage", 'url(' + playerWinner + ')');
                $("#"+(x + (3*(bs+1)))).css("backgroundImage", 'url(' + playerWinner + ')');
                whichPlayerWin(currentPlayer);
                gameOn = false;
            }
            x++;
        }else{
            r++;
            x = x + 3;
        }
    }

    x = 1;
    r = 1;
    if(bs == 5)
        tmp = 2;
    else if(bs == 7)
        tmp = 4;
    else if(bs == 9)
        tmp = 6;
    while(r <= bs){
        //console.log(x, (x + (bs - 1)), (x + (2*(bs-1))), (x + (3*(bs-1))));
        if(x == ((r*bs)-tmp)){
            x++;
            //console.log(x);
        }else if(x > ((r*bs)-tmp) &&
            x <= bs*bs &&
            (x + (bs - 1)) <= bs*bs &&
            (x + (2*(bs-1))) <= bs*bs &&
            (x + (3*(bs-1))) <= bs*bs){

            if($("#"+x).hasClass(currentPlayer) &&
                $("#"+(x + (bs - 1))).hasClass(currentPlayer) &&
                $("#"+(x + (2*(bs-1)))).hasClass(currentPlayer) &&
                $("#" + (x + (3*(bs-1)))).hasClass(currentPlayer)){
                //alert("You are the winner " + currentPlayer);
                $("#"+x).css("backgroundImage", 'url(' + playerWinner + ')');
                $("#"+(x + (bs - 1))).css("backgroundImage", 'url(' + playerWinner + ')');
                $("#"+(x + (2*(bs-1)))).css("backgroundImage", 'url(' + playerWinner + ')');
                $("#"+(x + (3*(bs-1)))).css("backgroundImage", 'url(' + playerWinner + ')');
                whichPlayerWin(currentPlayer);
                gameOn = false;
            }
            if(x == r*bs){
                r++;
            }
            x++;

        }else if(x < ((r*bs)-tmp)) {
            x++;
            //console.log(x);
        }else{
            return ;
        }
    }
}

function whichPlayerWin(currentPlayer){
    if(currentPlayer == "p1"){
        $("#playerTurn").text("Player 1 won!");
        $("#playerTurn").css("color","#F0144D");

        $("#image").attr("src","1.png");
    }else{
        $("#playerTurn").text("Player 2 won!")
        $("#playerTurn").css("color","#F0144D");
        $("#image").attr("src","2.png");
    }
}

