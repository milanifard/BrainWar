var num = 0;
var counterH = 0;
var counterV = 0;
var counterD = 0;
var player = 0;
var tileId = 1;
var currentP = null;
var player1Img = "1.png";
var player2Img = "2.png";
var clicked = false;

const board = $("#boardGame");

$('.but').click(function (){
    num = $(this).text();
    $('.but').prop("disabled",true);
    $('.but').css("backgroundColor", "#cccccc");
    $('.but').css("border", "1px solid #999999");
    $('.but').css("color", "#333");

    createBoard(num,num);
});

function createBoard(r,c){

    for(var i = 0; i < r ; i++){
        const row = $("<div>").addClass("row");
        for(var j = 0; j < c ; j++){
            const col = $("<div>").addClass("col");
            col.attr("id",tileId);
            tileId++;
            row.append(col);
        }
        board.append(row);
    }
}
//when a tile is clicked!
board.on("click", ".col", function(){
    var current = $(this);
    //var classN = current.attr("class");
    if(player == 0 && !current.hasClass("p1") && !current.hasClass("p2")){
        /*const img = $('<img>').addClass('p1');
        current.append(img);
        $(".p1").attr("src","1.png");*/
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
        currentP = current.attr("class");
        player = 0;
    }
    //alert(currentP);
});

function hasWin(currentPlayer){
    var calc = 0;
    for(var m = 0 ; m < 7; m++){
        for( var n = 1; n < 5; n++){
            for(var p=0 ; p<4 ; p++){
                calc = (7*m) + n + p;
                //console.log(calc);
                if($("#"+calc).hasClass(currentPlayer)){
                    //console.log(calc);
                    //$("#"+calc).css("backgroundColor", "red");
                    counterH++;
                    console.log(calc);

                }
            }
            if(counterH==4){
                alert("you winnnnn");
                return true;
            }
            counterH = 0;
        }
    }
    for(var m = 1 ; m < 8; m++){
        for( var n = 0; n < 4; n++){
            for(var p=0 ; p<4 ; p++){
                calc = (7*n) + m + (7*p);
                //console.log(calc);
                if($("#"+calc).hasClass(currentPlayer)){
                    //console.log(calc);
                    //$("#"+calc).css("backgroundColor", "red");
                    counterV++;
                    console.log(calc);

                }
            }
            if(counterV==4){
                alert("you winnnnn");
                return true;
            }
            counterV = 0;
        }
    }

    for(var m = 0 ; m<4 ; m++){
        for(var n = 0 ; n<4 ; n++){

            calc = (8*m) + (8*n) + 1;

            if($("#"+calc).hasClass(currentPlayer)){
                counterD++;
                console.log(calc);

            }
            if(counterD==4){
                alert("you winnnnn");
                return true;
            }



        }
        counterD = 0;
    }





}

//hasWin(p1);



