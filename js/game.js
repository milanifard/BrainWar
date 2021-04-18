let lastNumberClicked = 0
let score = 0
let squares = []

function checkEndBoard(){
    const boxes = document.getElementsByClassName("box")
    for (let i=0; i < boxes.length; i++){
        if (boxes[i].innerHTML != ""){
            return false
        }
    }
    lastNumberClicked = 0
    return true
}

function clicked(tag) {
    const situation = document.getElementById("situation")
    const scoreValue = document.getElementById("score")
    if (tag.innerHTML == ""){
    } else {
        if (parseInt(tag.innerHTML) == lastNumberClicked+1){
            situation.style.backgroundColor = "#4CAF50"
            situation.innerText = "it's ok"
            lastNumberClicked++
            score += 10
            tag.innerHTML = ""
            tag.style.backgroundColor = "white"
            scoreValue.innerText = score
            if (checkEndBoard()){
                createBoard(4)
            }
        }
        else {
            situation.style.backgroundColor = "red"
            situation.innerText = "Wrong move!"
            score -= 5
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
    for (let i=0; i < numberOfNumbers; i++){
        generateRandom(i+1)
    }
}


function generateRandom(value){
    let randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == "") {
        squares[randomNumber].innerHTML = value
        squares[randomNumber].style.backgroundColor = "#0066ff"
    } else generateRandom(value)
}

document.addEventListener('DOMContentLoaded', function() {
    createBoard(4);
})