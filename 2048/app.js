

let squares = []
let width = 4
let score = 0
document.addEventListener('DOMContentLoaded',()=>{
    const gameDisplay = document.querySelector('.game')
    

    let currentstate =[]
    createBoard(gameDisplay)


})



function randomGenerator(){
        
    let randNumber = Math.floor(Math.random() * squares.length);
    if (squares[randNumber].innerHTML == 0){
        squares[randNumber].innerHTML = 2
        squares[randNumber].style.backgroundColor = "rgb(195,150,150)"

        
    }
    else randomGenerator();
}

function createBoard(id){
for (let i= 0; i < 16; i++){
    square = document.createElement('div');
    square.innerHTML = 0;
    square.style.backgroundColor ="rgb(255,150,150)";
    id.appendChild(square);
    squares.push(square);
}

randomGenerator();
randomGenerator();
}

function newGame(){
    
    for(let i=0; i<16 ; i++){
        
        squares[i].innerHTML = 0;
        squares[i].style.backgroundColor ="rgb(255,150,150)";
    }

    score = 0
    document.getElementById('Score').innerHTML = score;

    randomGenerator();
    randomGenerator();
}
function fillRight(){
    for ( let i =0 ; i<16 ; i++){
        if(i%4 == 0){
            let sumone= squares[i].innerHTML;
            let sumtwo= squares[i+1].innerHTML;
            let sumthree= squares[i+2].innerHTML;;
            let sumfour= squares[i+3].innerHTML
            let row = [parseInt(sumone),parseInt(sumtwo),parseInt(sumthree),parseInt(sumfour)];

            let filterRow = row.filter(num => num);
            let missing = 4 - filterRow.length
            let zero = Array(missing).fill(0);
            let newrow = zero.concat(filterRow)

            squares[i].innerHTML = newrow[0]
            squares[i+1].innerHTML = newrow[1]
            squares[i+2].innerHTML = newrow[2]
            squares[i+3].innerHTML = newrow[3]
        }
    }
}

function fillLeft(){
    for ( let i =0 ; i<16 ; i++){
        if(i%4 == 0){
            let sumone= squares[i].innerHTML;
            let sumtwo= squares[i+1].innerHTML;
            let sumthree= squares[i+2].innerHTML;
            let sumfour= squares[i+3].innerHTML;
            let row = [parseInt(sumone),parseInt(sumtwo),parseInt(sumthree),parseInt(sumfour)];

            let filterRow = row.filter(num => num);
            let missing = 4 - filterRow.length
            let zero = Array(missing).fill(0);
            let newrow = filterRow.concat(zero)

            squares[i].innerHTML = newrow[0]
            squares[i+1].innerHTML = newrow[1]
            squares[i+2].innerHTML = newrow[2]
            squares[i+3].innerHTML = newrow[3]
        }
    }
}

function mergeRow(){
    for (let i = 0 ; i<4 ; i++){
        for(let j = 0 ; j< 3;j++)
            if(squares[4*i+j].innerHTML === squares[4*i+j+1].innerHTML){
                let sum = parseInt(squares[4*i+j].innerHTML) +parseInt(squares[4*i+j+1].innerHTML)
                squares[4*i+j].innerHTML = sum;
                squares[4*i+j+1].innerHTML = 0;
                score +=sum
                document.getElementById('Score').innerHTML = score;


            }

    }

}

function fillDown(){
    for(let i = 0 ; i<4 ; i++){
        let sumone= squares[i].innerHTML;
        let sumtwo= squares[i+width].innerHTML;
        let sumthree= squares[i+(width*2)].innerHTML;;
        let sumfour= squares[i+(width*3)].innerHTML
        let column = [parseInt(sumone),parseInt(sumtwo),parseInt(sumthree),parseInt(sumfour)];
        
        
        let filterColumn = column.filter(num => num);
        let missing = 4 - filterColumn.length
        let zero = Array(missing).fill(0);
        let newColumn= zero.concat(filterColumn)

        squares[i].innerHTML =newColumn[0]
        squares[i+width].innerHTML=newColumn[1]
        squares[i+(width*2)].innerHTML=newColumn[2]
        squares[i+(width*3)].innerHTML=newColumn[3]
        
    }
}
function fillUp(){
    for(let i = 0 ; i<4 ; i++){
        let sumone= squares[i].innerHTML;
        let sumtwo= squares[i+width].innerHTML;
        let sumthree= squares[i+(width*2)].innerHTML;;
        let sumfour= squares[i+(width*3)].innerHTML
        let column = [parseInt(sumone),parseInt(sumtwo),parseInt(sumthree),parseInt(sumfour)];
        
        
        let filterColumn = column.filter(num => num);
        let missing = 4 - filterColumn.length
        let zero = Array(missing).fill(0);
        let newColumn= filterColumn.concat(zero)

        squares[i].innerHTML =newColumn[0]
        squares[i+width].innerHTML=newColumn[1]
        squares[i+(width*2)].innerHTML=newColumn[2]
        squares[i+(width*3)].innerHTML=newColumn[3]
        
    }
}

function mergeColumn(){
    for (let i = 0 ; i<12 ; i++){
        if(squares[i].innerHTML === squares[i+width].innerHTML){
             let sum = parseInt(squares[i].innerHTML) +parseInt(squares[i+width].innerHTML)
             squares[i].innerHTML = sum;
             squares[i+width].innerHTML = 0;
             score +=sum
             document.getElementById('Score').innerHTML = score;


        }

    }

}
function changeColor(){
    for(let i=0 ; i<16 ; i++ ){
 
            var index =Math.log2(parseInt(squares[i].innerHTML))
            if(index>0){
                let red = 195+index*7;
                let green = 150-index*5;
                let blue = 150-index*5;

                if (red === 255){
                    red = 255;
                    green = 0;
                    blue = 0;
                }
                let color = "rgb("+ red +","+ green +", "+ blue +")" ;
                squares[i].style.backgroundColor = color ;
            }
            else
            squares[i].style.backgroundColor = "rgb(255,150,150)" ;
    }
}
function gameStatus(){
    let state = false;
    for(let i=0 ; i<16 ; i++){
        if(squares[i].innerHTML == 0)
            state = true;
    }
    if (state == false){

        if(confirm("game is over press ok for new game")){

            newGame();
        }
    }
}
function moveUp(){
    fillUp();
    mergeColumn();
    fillUp();
    randomGenerator();
    changeColor();
    gameStatus();
}
function moveDown(){
    fillDown();
    mergeColumn();
    fillDown();
    randomGenerator();
    changeColor();
    gameStatus();
}

function moveRight(){
    fillRight();
    mergeRow();
    fillRight();
    randomGenerator();
    changeColor();
    gameStatus();
}

function moveLeft(){
    fillLeft();
    mergeRow();
    fillLeft();
    randomGenerator();
    changeColor();
    gameStatus();
}


function buttomReset(){
    newGame();
}

function buttonRight(){
    moveRight();
}
function buttonLeft(){
    moveLeft();
}
function buttonUp(){
    moveUp();
}
function buttonDown(){
    moveDown()
}
