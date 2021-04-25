const arrow = document.querySelector('#arrow');
const choices = Array.from(document.querySelectorAll('.choice-arrow'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentAnswer = 0
let acceptingAnswers = true
let score = 0
let arrowCounter = 0

let arrows = [3, 1, 4, 2, 1, 2, 3, 4]
/*{
    arrow: document.getElementById("imgArrow").src="red-up.png",
    choice1: "up",
    choice2: "left",
    choice3: "down",
    choice4: "right",
    answer: 3,
},
{
    arrow: document.getElementById("imgArrow").src="red-down.png",
    choice1: "up",
    choice2: "left",
    choice3: "down",
    choice4: "right",
    answer: 1,
},
{
    arrow: document.getElementById("imgArrow").src="red-left.png",
    choice1: "up",
    choice2: "left",
    choice3: "down",
    choice4: "right",
    answer: 4,
},
{
    arrow: document.getElementById("imgArrow").src="red-right.png",
    choice1: "up",
    choice2: "left",
    choice3: "down",
    choice4: "right",
    answer: 2,
},
{
    arrow: document.getElementById("imgArrow").src="blue-up.png",
    choice1: "up",
    choice2: "left",
    choice3: "down",
    choice4: "right",
    answer: 1,
},
{
    arrow: document.getElementById("imgArrow").src="blue-left.png",
    choice1: "up",
    choice2: "left",
    choice3: "down",
    choice4: "right",
    answer: 2,
},
{
    arrow: document.getElementById("imgArrow").src="blue-down.png",
    choice1: "up",
    choice2: "left",
    choice3: "down",
    choice4: "right",
    answer: 3,
},
{
    arrow: document.getElementById("imgArrow").src="blue-right.png",
    choice1: "up",
    choice2: "left",
    choice3: "down",
    choice4: "right",
    answer: 4,
}
]*/

const SCORE_POINTS = 10
const MAX_ARROWS = 6

startGame = () => {
    arrowCounter = 0
    score = 0
    getNewArrow()
}

getNewArrow = () => {
    if(arrowCounter >= MAX_ARROWS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    arrowCounter++
    progressText.innerText = `Arrow ${arrowCounter} of ${MAX_ARROWS}`
    progressBarFull.style.width = `${(arrowCounter/MAX_ARROWS) * 100}%`

    const arrowsIndex = Math.floor(Math.random() * 8)
    currentAnswer = arrows[arrowsIndex]
    if (arrowsIndex == 0)
        arrow.ima = document.getElementById("imgArrow").src = "red-up.png"
    else if (arrowsIndex == 1)
        arrow.ima = document.getElementById("imgArrow").src="red-down.png"
    else if (arrowsIndex == 2)
        arrow.ima = document.getElementById("imgArrow").src="red-left.png"
    else if (arrowsIndex == 3)
        arrow.ima = document.getElementById("imgArrow").src="red-right.png"
    else if (arrowsIndex == 4)
        arrow.ima = document.getElementById("imgArrow").src="blue-up.png"
    else if (arrowsIndex == 5)
        arrow.ima = document.getElementById("imgArrow").src="blue-left.png"
    else if (arrowsIndex == 6)
        arrow.ima = document.getElementById("imgArrow").src="blue-down.png"
    else if (arrowsIndex == 7)
        arrow.ima = document.getElementById("imgArrow").src="blue-right.png"

    //arrow.answer = arrows[arrowsIndex]
    //arrow.img = document.getElementById("imgArrow").src="blue-down.png"

    /*choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.content = currentArrow['choice' + number]
    })*/

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', async e => {
        if(!acceptingAnswers)
            return

        acceptingAnswers = false
        const selectedChoice = e.target
        console.log(e)
        console.log(selectedChoice.id)
        let selectedAnswer;
        switch (selectedChoice.id) {
            case "up-arrow":
                selectedAnswer = 1;
                break;
            case "left-arrow":
                selectedAnswer = 2;
                break;
            case "down-arrow":
                selectedAnswer = 3;
                break;
            case "right-arrow":
                selectedAnswer = 4;
                break;
        }

        let classToApply = selectedAnswer == currentAnswer ? 'correct' : 'incorrect'

        console.log("classToApply", classToApply, selectedAnswer, currentAnswer);

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        await setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewArrow()
        }, 800);
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()