let lastNumberClicked = 0
let score = 0
let squares = []
let numberOfCorrectMoves = 0
let numberOfWrongMoves = 0
let colorOfBoxes = 0 //0 for blue and 1 for red
let numberOfRound = 0
let numberOfBoxes = 4

function checkEndBoard(){
    const boxes = document.getElementsByClassName("box")
    for (let i=0; i < boxes.length; i++){
        if (boxes[i].innerHTML != ""){
            return false
        }
    }
    return true
}

function clicked(tag) {
    const situation = document.getElementById("situation")
    const scoreValue = document.getElementById("score")
    if (tag.innerHTML == ""){
    } else {
        if (colorOfBoxes == 0 && parseInt(tag.innerHTML) == lastNumberClicked+1){
            situation.style.backgroundColor = "#4CAF50"
            situation.innerText = "it's ok"
            lastNumberClicked++
            numberOfCorrectMoves++
            score = score + 10 + (Math.floor(numberOfRound * 0.7))
            tag.innerHTML = ""
            tag.style.backgroundColor = "white"
            scoreValue.innerText = score
            if (checkEndBoard()){
                numberOfRound++
                if (numberOfRound % 4 == 0){
                    if (numberOfBoxes < 16){
                        numberOfBoxes++
                    }
                }
                createBoard(numberOfBoxes)
            }
        } else if (colorOfBoxes == 1 && parseInt(tag.innerHTML) == lastNumberClicked-1){
            situation.style.backgroundColor = "#4CAF50"
            situation.innerText = "it's ok"
            lastNumberClicked--
            numberOfCorrectMoves++
            score = score + 10 + (Math.floor(numberOfRound * 0.7))
            tag.innerHTML = ""
            tag.style.backgroundColor = "white"
            scoreValue.innerText = score
            if (checkEndBoard()){
                numberOfRound++
                if (numberOfRound % 4 == 0){
                    if (numberOfBoxes < 16){
                        numberOfBoxes++
                    }
                }
                createBoard(numberOfBoxes)
            }
        }
        else {
            situation.style.backgroundColor = "red"
            situation.innerText = "Wrong move!"
            numberOfWrongMoves++
            score = score - 10 - (Math.floor(numberOfRound * 0.7))
            scoreValue.innerText = score
        }
    }
}

function createBoard(numberOfNumbers){
    const grid = document.getElementsByClassName("grid")
    const child = grid[0].childNodes
    for (let i=0; i < child.length; i++){
        if (child[i].nodeName == "DIV"){
            squares.push(child[i])
        }
    }
    let random = Math.floor(Math.random() * squares.length)
    if (random % 2 == 0){
        lastNumberClicked = 0
        colorOfBoxes = 0
    } else {
        lastNumberClicked = numberOfBoxes+1
        colorOfBoxes = 1
    }
    for (let i=0; i < numberOfNumbers; i++){
        generateRandom(i+1)
    }
}


function generateRandom(value){
    let randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == "") {
        squares[randomNumber].innerHTML = value
        if (colorOfBoxes == 0) {
            squares[randomNumber].style.backgroundColor = "#0066ff"
        } else squares[randomNumber].style.backgroundColor = "#ff0066"
    } else generateRandom(value)
}

document.addEventListener('DOMContentLoaded', function() {
    createBoard(numberOfBoxes);
})