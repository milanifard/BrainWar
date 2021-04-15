const board = $('#board');
let ROWS = 0;
let COLS = 0;
let level = null;

$(".levelButton").click(function () {

    level = $(this).text();
    if (level == "Easy") {
        ROWS = 5;
        COLS = 5;
    } else if (level == "Medium") {
        ROWS = 10;
        COLS = 10;
    } else if(level === "Hard") {
        ROWS = 15;
        COLS = 15;
    }else{
        ROWS = 10;
        COLS = 10;
    }
    restart();
});

function createBoard(rows, cols) {
    board.empty();
    for (let i = 0; i < rows; i++) {
        const row = $('<div>').addClass('row');
        for (let j = 0; j < cols; j++) {
            const col = $('<div>')
                .addClass('col hidden')
                .attr('data-row', i)
                .attr('data-col', j);
            if(level === "Test")
                col.addClass("showBomb");
            if (Math.random() < 0.1)
                col.addClass('mine');

            row.append(col);
        }
        board.append(row);
    }
}

function restart() {
    $("#status").css("display", "none");
    $("#restartButton").css("display", "inline-block");
    createBoard(ROWS, COLS);
}

$("#restartButton").click(function () {
    restart();
});

function gameOver(isWin) {
    let message = null;
    let icon = null;
    if (isWin) {
        message = 'YOU WON!';
        icon = 'fa fa-flag';
    } else {
        message = 'YOU LOST!';
        icon = 'fa fa-bomb';
    }
    $('.col.mine').append(
        $('<i>').addClass(icon)
    );
    $('.col:not(.mine)')
        .html(function () {
            const cell = $(this);
            const count = getMineCount(
                cell.data('row'),
                cell.data('col'),
            );
            return count === 0 ? '' : count;
        });
    $('.col.hidden').removeClass('hidden');
    $("#status").text(message);
    $("#status").css("display", "block");
    setTimeout(function () {
        restart();
    }, 3000);
}

function reveal(oi, oj) {
    const seen = {};

    function helper(i, j) {
        if (i >= ROWS || j >= COLS || i < 0 || j < 0) return;
        const key = `${i} ${j}`;
        //console.log(key);
        if (seen[key]) return;
        const cell = $(`.col.hidden[data-row=${i}][data-col=${j}]`);
        const mineCount = getMineCount(i, j);
        if (!cell.hasClass('hidden') ||
            cell.hasClass('mine')
        ) {
            return;
        }

        cell.removeClass('hidden');

        if (mineCount) {
            cell.text(mineCount);
            return;
        }

        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                helper(i + di, j + dj);
            }
        }
    }

    helper(oi, oj);
}


function getMineCount(i, j) {
    let count = 0;
    for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= ROWS || nj >= COLS || nj < 0 || ni < 0) continue;
            const cell =
                $(`.col.hidden[data-row=${ni}][data-col=${nj}]`);
            if (cell.hasClass('mine')) count++;
        }
    }
    return count;
}

board.on('click', '.col.hidden', function () {
    const cell = $(this);
    const row = cell.data('row');
    const col = cell.data('col');

    if (cell.hasClass('mine')) {
        gameOver(false);
    } else {
        reveal(row, col);
        const isGameOver = $('.col.hidden').length === $('.col.mine').length
        if (isGameOver) gameOver(true);
    }
});
