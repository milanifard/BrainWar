class QuickEye {
    constructor(totalTime) {
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
    }

    startGame() {
        this.totalClicks = 0;
        this.Correct = 0
        this.Incorrect = 0
        this.timeRemaining = this.totalTime;

        setTimeout(() => {
            this.countdown = this.startCountdown();
        }, 500)

        this.cardListSource = {
            A:"/A-Z/colored/A.png",
            B:"/A-Z/colored/B.png",
            C:"/A-Z/colored/C.png",
            D:"/A-Z/colored/D.png",
            E:"/A-Z/colored/E.png",
            F:"/A-Z/colored/F.png",
            G:"/A-Z/colored/G.png",
            H:"/A-Z/colored/H.png",
            I:"/A-Z/colored/I.png",
            J:"/A-Z/colored/J.png",
            K:"/A-Z/colored/K.png",
            L:"/A-Z/colored/L.png",
            M:"/A-Z/colored/M.png",
            N:"/A-Z/colored/N.png",
            O:"/A-Z/colored/O.png",
            P:"/A-Z/colored/P.png",
            Q:"/A-Z/colored/Q.png",
            R:"/A-Z/colored/R.png",
            S:"/A-Z/colored/S.png",
            T:"/A-Z/colored/T.png",
            U:"/A-Z/colored/U.png",
            V:"/A-Z/colored/V.png",
            W:"/A-Z/colored/W.png",
            X:"/A-Z/colored/X.png",
            Y:"/A-Z/colored/Y.png",
            Z:"/A-Z/colored/Z.png",
            0:"/0-9/colored/0.png",
            1:"/0-9/colored/1.png",
            2:"/0-9/colored/2.png",
            3:"/0-9/colored/3.png",
            4:"/0-9/colored/4.png",
            5:"/0-9/colored/5.png",
            6:"/0-9/colored/6.png",
            7:"/0-9/colored/7.png",
            8:"/0-9/colored/8.png",
            9:"/0-9/colored/9.png"
            };

        this.slideListSource = {
            A:"/A-Z/A.png",
            B:"/A-Z/B.png",
            C:"/A-Z/C.png",
            D:"/A-Z/D.png",
            E:"/A-Z/E.png",
            F:"/A-Z/F.png",
            G:"/A-Z/G.png",
            H:"/A-Z/H.png",
            I:"/A-Z/I.png",
            J:"/A-Z/J.png",
            K:"/A-Z/K.png",
            L:"/A-Z/L.png",
            M:"/A-Z/M.png",
            N:"/A-Z/N.png",
            O:"/A-Z/O.png",
            P:"/A-Z/P.png",
            Q:"/A-Z/Q.png",
            R:"/A-Z/R.png",
            S:"/A-Z/S.png",
            T:"/A-Z/T.png",
            U:"/A-Z/U.png",
            V:"/A-Z/V.png",
            W:"/A-Z/W.png",
            X:"/A-Z/X.png",
            Y:"/A-Z/Y.png",
            Z:"/A-Z/Z.png",
            0:"/0-9/0.png",
            1:"/0-9/1.png",
            2:"/0-9/2.png",
            3:"/0-9/3.png",
            4:"/0-9/4.png",
            5:"/0-9/5.png",
            6:"/0-9/6.png",
            7:"/0-9/7.png",
            8:"/0-9/8.png",
            9:"/0-9/9.png"
            };
    }

    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            if(this.timeRemaining === 0)
                this.timeOver();
        }, 1000);
    }

    timeOver() {
        clearInterval(this.countdown);
        localStorage.setItem("totalClicks", this.totalClicks);
        localStorage.setItem("correct", this.Correct);
        localStorage.setItem("incorrect", this.Incorrect);
        window.location.href = "result.html?totalClicks=" + this.totalClicks + "&correct=" + this.Correct + "&incorrect=" + this.Incorrect;
    }

    checkCard(card) {
        if(card.className === 'card visible'){
            let cardAlt = this.getCardAlt(card);
            let slideAlt = this.getSlideAlt();
            if(cardAlt === slideAlt){
                this.totalClicks++;
                this.Correct++;


                //choose the next slide
                this.nextSlide();
                //add new card to one of the back cards
                this.addCard();
                //flip the card
                this.hideCard(card);


            } else {
                this.totalClicks++;
                this.Incorrect++; 
            }
        }
    }

    addCard() {
        let backCards = [];
        let card = Array.from(document.getElementsByClassName('card'));
        for(let i = 0; i < card.length; i++){
            if(card[i].className !== 'card visible'){
                backCards.push(card[i]); 
            }
        }

        backCards = this.shuffle(backCards);
        let currentBackCard = backCards[0];
        let currentCardAdd = this.getRandom();

        currentBackCard.getElementsByClassName('card-value')[0].src = this.cardListSource[currentCardAdd];
        currentBackCard.getElementsByClassName('card-value')[0].alt = currentCardAdd;

        let previousLabel = this.getPreviousSlideLabel();

        previousLabel.innerHTML = "<img class=\"topCard\" src=\"" + this.slideListSource[currentCardAdd]
            + "\" alt=\"" + currentCardAdd + "\">";

        currentBackCard.classList.add('visible');
    }

    shuffle(inputArray) {
        let currentIndex = inputArray.length, temporaryValue, randomIndex;
    
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            temporaryValue = inputArray[currentIndex];
            inputArray[currentIndex] = inputArray[randomIndex];
            inputArray[randomIndex] = temporaryValue;
        }
      
        return inputArray;
    }

    getRandom() {
        return Object.keys(this.slideListSource)[Math.floor(Math.random()*Object.keys(this.slideListSource).length)];
    }

    nextSlide() {
        let sliders = document.getElementsByName('slider');
        if(sliders[0].checked === true) {
            sliders[1].checked = true;
        } else if(sliders[1].checked === true) {
            sliders[2].checked = true;
        } else if(sliders[2].checked === true) {
            sliders[3].checked = true;
        } else if(sliders[3].checked === true) {
            sliders[4].checked = true;
        } else if(sliders[4].checked === true) {
            sliders[5].checked = true;
        } else if(sliders[5].checked === true) {
            sliders[0].checked = true;
        }
    }

    hideCard(card) {
        card.classList.remove('visible');
    }

    getCardAlt(card) {
        return card.getElementsByClassName('card-value')[0].alt;
    }

    getSlideAlt() {
        let sliders = document.getElementsByName('slider');
        for(let i = 0; i < sliders.length; i++){
            if(sliders[i].checked){
                let selector = 'label[for=' + sliders[i].id + ']';
                let label = document.querySelector(selector);
                let img = label.getElementsByTagName('img')[0];
                return img.getAttribute('alt');
            }
        }
    }

    getPreviousSlideLabel() {
        let sliders = document.getElementsByName('slider');
        for(let i = 0; i < sliders.length; i++){
            if(sliders[i].checked && i === 0){
                let selector = 'label[for=' + sliders[sliders.length-1].id + ']';
                return document.querySelector(selector);
            } else if (sliders[i].checked && i !== 0){
                let selector = 'label[for=' + sliders[i-1].id + ']';
                return document.querySelector(selector);
            }
        }
    }
}

function ready() {
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new QuickEye(30);
    game.startGame();

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.checkCard(card);
        });
    });
}

ready();