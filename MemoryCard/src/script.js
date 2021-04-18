let cards = ['beehive', 'koala', 'bird', 'tiger','panda','pelican','penguin','walrus', 'beehive', 'koala', 'bird', 'tiger','panda','pelican','penguin','walrus'];
let shuffledCards = [];

let i;
for (i = 0; i < 16; i++){
    let n = Math.floor(Math.random() * (16 - i));
    shuffledCards.push(cards[n]);
    cards.splice(n, 1);
}

for(i = 0; i < shuffledCards.length; i++) {
    document.querySelector('.table').innerHTML += `<li class="card"><img src="img/${shuffledCards[i]}.svg" alt=""/></li>`;
}

let selectedCard;

document.querySelectorAll('.card').forEach((card) => {

    if (card.classList.contains("show")) {
        console.log("shit")
        return;
    }

    card.addEventListener("click", ()=>{
        card.classList.add("show");
    })
})

