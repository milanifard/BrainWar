const board = $("#boardGame");

var row = 7;
var col = 7;
var player = 0;
var tileId = 1;
var player1Img = "1.png";
var player2Img = "2.png";
function createBoard(r, c){
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

createBoard(7,7);


$(".col").click(function (){
    var current = $(this);
    if(player == 0){
        /*const img = $('<img>').addClass('p1');
        current.append(img);
        $(".p1").attr("src","1.png");*/
        current.css("backgroundImage", 'url(' + player1Img + ')');
        current.css("backgroundSize", "80%");
        current.css("backgroundRepeat", "no-repeat");
        current.css("backgroundPosition", "center");
        player = 1;
    }else{
        current.css("backgroundImage", 'url(' + player2Img + ')');
        current.css("backgroundSize", "80%");
        current.css("backgroundRepeat", "no-repeat");
        current.css("backgroundPosition", "center");
        player = 0;
    }

});