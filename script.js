const board = $("#boardGame");

var row = 7;
var col = 7;
var player = null;
function createBoard(r, c){
    for(var i = 0; i < r ; i++){
        const row = $("<div>").addClass("row");
        for(var j = 0; j < c ; j++){
            const col = $("<div>").addClass("col");
            row.append(col);
        }
        board.append(row);
    }
}

createBoard(7,7);


$(".col").click(function (){
    player = 1;
    var current = $(this);
    console.log($(this).css('backgroundColor','#333'));
    if(player == 1){
        const img = $('<img>').addClass('p1');
        current.append(img);
        $(".p1").attr("src","1.png")
    }

});