document.addEventListener('DOMContentLoaded',()=>{
    const cardArray=[
        {
            name:'man',
            img:'image/man.png'
        },
        {
            name:'man',
            img:'image/man.png'
        },
        {
            name:'man11',
            img:'image/man11.png'
        },
        {
            name:'man11',
            img:'image/man11.png'
        },
        {
            name:'boy',
            img:'image/boy1.png'
        },
        {
            name:'boy',
            img:'image/boy1.png'
        },
        {
            name:'girl',
            img:'image/girl1.png'
        },
        {
            name:'girl',
            img:'image/girl1.png'
        },
        {
            name:'woman',
            img:'image/woman1.png'
        },
        {
            name:'woman',
            img:'image/woman1.png'
        },
        {
            name:'man22',
            img:'image/man22.png'
        },
        {
            name:'man22',
            img:'image/man22.png'
        }
    ]


    var grid=document.querySelector('.grid')
    var backgrid=document.querySelector('.backgrid')
    var cardsChosen=[]
    var cardsChosenId=[]
    var cardsWon=[]
    var card
    correct = sessionStorage.getItem('c');
    incorrect= sessionStorage.getItem('ic');
    var backCard
    var flag=0
    var restart=0

    if(!correct) {
        correct = 0;
    }
    if(!incorrect) {
        incorrect = 0;
    }



        document.getElementById('Button').onclick = function () {
            grid.remove()
            document.getElementById('Button').style.visibility = 'hidden';
            createBoard()
        }


        //display all images to memorize first
        function buildImage() {
            for (let i = 0; i < randArray.length; i++) {
                card = document.createElement('img')
                card.setAttribute('src', randArray[i].img)
                card.setAttribute('data-id', i)
                grid.appendChild(card)
            }
        }

        //creat game board
        function createBoard() {
            for (let i = 0; i < backArray.length; i++) {
                backCard = document.createElement('img')
                backCard.setAttribute('src', 'image/back.png')
                backCard.setAttribute('data-id', i)
                backCard.addEventListener('click', flipCard)
                backgrid.appendChild(backCard)
            }
        }

        //check for match
        function checkForMatch() {
            var cards = document.querySelectorAll('img')
            const optionOneId = cardsChosenId[0]
            const optionTwoId = cardsChosenId[1]
            if (cardsChosen[0] === cardsChosen[1]) {
                cards[optionOneId].setAttribute('src', 'image/blue.png')
                cards[optionTwoId].setAttribute('src', 'image/blue.png')
                backArray[cardsChosenId[0]].img='image/blue.png';
                backArray[cardsChosenId[1]].img='image/blue.png';
                cardsWon.push(cardsChosen)
                sessionStorage.setItem('c', ++correct);
            }
            else {
                cards[optionOneId].setAttribute('src', 'image/back.png')
                cards[optionTwoId].setAttribute('src', 'image/back.png')
                sessionStorage.setItem('ic', ++incorrect);
            }
            cardsChosen = []
            cardsChosenId = []
            if (cardsWon.length === randArray.length / 2) {
                location.reload();
            }
        }

        //flip cards
        function flipCard() {
            var cardId = this.getAttribute('data-id')
            cardsChosen.push(randArray[cardId].name)
            cardsChosenId.push(cardId)
            this.setAttribute('src', backArray[cardId].img)
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500)
            }
        }

        function Rand(){
            randArray = cardArray.sort(() => 0.5 - Math.random())
            backArray= randArray
            buildImage()
        }

    Rand()
})
var score=function(){
    var textScore = {
        text1:" "+ correct,
        text2:" "+ incorrect
    };
    return textScore;
}