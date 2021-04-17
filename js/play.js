{
    // the time of you can play
    let countDown = 30;

    // the count of the correct and wrong answers
    let correctAns = 0;
    let wrongAns = 0;


    // decrease amount of the countDown every 1 seconds until to arrive zero
    let timer = setInterval(function(){
        if(countDown <= 0){
            // alert("correct: " + correctAns+ "\n" + "wrong: " + wrongAns);

            // redirect to another page for show the result
            let url = "result.html?correct=" + encodeURIComponent(correctAns) + "&wrong=" + encodeURIComponent(wrongAns);
            window.location.href = url;
            clearInterval(timer)
        }
        // show the remain time
        document.getElementById("timer").innerHTML =  countDown;

        countDown -= 1;
    }, 1000);


    // store the name, color and source image of a picture and correctness of pic is false by default
    class Pictures {
        constructor(name, color, sourceImage) {
            this.name = name;
            this.color = color;
            this.sourceImage = sourceImage;
            this.correct = false;
        }

        // correctness of the pic convert to true
        setCorrectNess(correct){
            this.correct = correct;
        }
    }


    // make an array of picture class that store all of states
    function makeObjectOfPictures(){
        let names = ["sunny", "cloudy", "rainy"];
        let colors = ["blue", "red", "gray"];
        let pictures = []

        for(let i = 0; i < names.length; ++i){
            for (let j = 0; j < colors.length; ++j){
                pictures[i * names.length + j] = new Pictures(names[i], colors[j], "images/card"+colors[j]+names[i]+".png");
            }
        }

        return pictures;
    }

    // go to sleep then do all the rest jobs
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // make the question picture with choose a random picture of the all states
    function show() {
        let question = document.getElementById("question");
        let pictures = makeObjectOfPictures();

        // choose a pic randomly
        let first = pictures[Math.floor(Math.random() * 9)];

        // console.log("question")
        // console.log(first)
        question.className='size center';
        question.src = first.sourceImage;
        sleep(0.5).then(() => question.className='size center fade-in-image');
        return first;
    }


    let question;
    let flag = 0;
    if(flag === 0){
        // store the question picture
        question = show();

        // console.log(question)
        flag ++;
    }


    // make 3 options for choose one of them as your answer
    function showOption(){
        // store all of the states
        let pictures = makeObjectOfPictures();

        let option = [];

        // option1 is the red sunny and option2 is the gray cloudy and last option is the blue rainy forever
        for(let i=0; i<pictures.length; ++i){
            if(pictures[i].name === "sunny" && pictures[i].color === "red") {
                option[0] = pictures[i];
                document.getElementById("option1").src = option[0].sourceImage;
            }
            else if(pictures[i].name === "cloudy" && pictures[i].color === "gray") {
                option[1] = pictures[i]
                document.getElementById("option2").src = option[1].sourceImage;
            }
            if(pictures[i].name === "rainy" && pictures[i].color === "blue") {
                option[2] = pictures[i]
                document.getElementById("option3").src = option[2].sourceImage;
            }
        }

        return option;
    }

    // store the three options
    let option = showOption();


    let wrongId = "";

    // choose an option as your answer by click on that image
    function selectOption(clickedId){
        let correct = -1;

        // if the same shape and color of the question is in the answer options, that is correct answer
        for (let i=0; i<option.length; ++i) {
            if (option[i].name === question.name && option[i].color === question.color) {
                option[i].setCorrectNess(true);
                correct = i;
            }
        }

        // else, a completely different of the question is the correct answer
        if(correct === -1){
            for (let i=0; i<option.length; ++i) {
                if (option[i].name !== question.name && option[i].color !== question.color) {
                    option[i].setCorrectNess(true);
                    correct = i;
                }
            }
        }

        // check the chosen option is correct or wrong
        if("option" +(correct+1) === clickedId){
            correctAns += 1;
            // console.log(true)
            // console.log(wrongId)
            if (wrongId.length > 0) {
                document.getElementById(wrongId).className = "size center";
                wrongId = "";
            }
            question = show()
        }else{
            wrongAns += 1;
            wrongId = clickedId;
            document.getElementById(clickedId).className += " image"
            // console.log(false)
        }

    }
}