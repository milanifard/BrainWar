let cards = ['beehive', 'koala', 'bird', 'tiger','panda','pelican','penguin','walrus', 'beehive', 'koala', 'bird', 'tiger','panda','pelican','penguin','walrus'];
let shuffledCards = [];
let i;
let singleUnmatchedCard;
let shownCards = []

for (i = 0; i < 16; i++){
    let n = Math.floor(Math.random() * (16 - i));
    shuffledCards.push(cards[n]);
    cards.splice(n, 1);
}

for(i = 0; i < shuffledCards.length; i++) {
    document.querySelector('.table').innerHTML += `<li class="card"><img src="img/${shuffledCards[i]}.svg" alt=""/></li>`;
}

document.querySelectorAll('.card').forEach((card) => {

    card.addEventListener("click", ()=>{

        if (card.classList.contains("show")) {
            return;
        }

        card.classList.add("show", "open");

        if (singleUnmatchedCard == null){
            singleUnmatchedCard = card;
            shownCards.push(card);
            return;
        }
        if (card.innerHTML === singleUnmatchedCard.innerHTML){
            card.classList.add("accepted");
            singleUnmatchedCard.classList.add("accepted");
            shownCards.push(card);
            singleUnmatchedCard = null;
        }
        else {
            card.classList.add("wrong");
            singleUnmatchedCard.classList.add("wrong");
            document.querySelectorAll(".wrong").forEach( (wrong) => {
                setTimeout(function (){
                    wrong.classList.remove("show");
                    wrong.classList.remove("wrong");
                }, 1000)
            })
            singleUnmatchedCard = null;
            shownCards.pop();
        }
        if (shownCards.length === 16){
            document.querySelector(".infobox").innerHTML = '<h1>Well Played!!!</h1>';
        }

    })
})
