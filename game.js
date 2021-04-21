const RAD = Math.PI / 180;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.tabIndex = 1;
canvas.addEventListener("click", () => {
    switch (state.curr) {
        case state.getReady:
            state.curr = state.Play;
            sound.start.play();
            break;
        case state.Play:
            bird.flap();
            break;
        case state.gameOver:
            state.curr = state.getReady;
            bird.speed = 0;
            bird.y = 100;
            pipe.pipes = [];
            UI.score.curr = 0;
            sound.played = false;
            break;
    }
});

canvas.onkeydown = function keyDown(e) {
    // Space Key or W key or arrow up
    if (e.keyCode == 32 || e.keyCode == 87 || e.keyCode == 38) {
        switch (state.curr) {
            case state.getReady:
                state.curr = state.Play;
                sound.start.play();
                break;
            case state.Play:
                bird.flap();
                break;
            case state.gameOver:
                state.curr = state.getReady;
                bird.speed = 0;
                bird.y = 100;
                pipe.pipes = [];
                UI.score.curr = 0;
                sound.played = false;
                break;
        }
    }
};

let frames = 0;
let dx = 2;
const state = {
    curr: 0,
    getReady: 0,
    Play: 1,
    gameOver: 2,
};
const sound = {
    start: new Audio(),
    flap: new Audio(),
    score: new Audio(),
    hit: new Audio(),
    die: new Audio(),
    played: false,
};
const ground = {
    sprite: new Image(),
    x: 0,
    y: 0,
    draw: function () {
        this.y = parseFloat(canvas.height - this.sprite.height);
        context.drawImage(this.sprite, this.x, this.y);
    },
    update: function () {
        if (state.curr != state.Play) return;
        this.x -= dx;
        this.x = this.x % (this.sprite.width / 2);
    },
};
const background = {
    sprite: new Image(),
    x: 0,
    y: 0,
    draw: function () {
        y = parseFloat(canvas.height - this.sprite.height);
        context.drawImage(this.sprite, this.x, y);
    },
};
const pipe = {
    top: { sprite: new Image() },
    bot: { sprite: new Image() },
    gap: 85,
    moved: true,
    pipes: [],
    draw: function () {
        for (let i = 0; i < this.pipes.length; i++) {
            let p = this.pipes[i];
            context.drawImage(this.top.sprite, p.x, p.y);
            context.drawImage(this.bot.sprite, p.x, p.y + parseFloat(this.top.sprite.height) + this.gap);
        }
    },
    update: function () {
        if (state.curr != state.Play) return;
        if (frames % 100 == 0) {
            this.pipes.push({ x: parseFloat(canvas.width), y: -210 * Math.min(Math.random() + 1, 1.8) });
        }
        this.pipes.forEach((pipe) => {
            pipe.x -= dx;
        });

        if (this.pipes.length && this.pipes[0].x < -this.top.sprite.width) {
            this.pipes.shift();
            this.moved = true;
        }
    },
};
const bird = {
    animations: [{ sprite: new Image() }, { sprite: new Image() }, { sprite: new Image() }, { sprite: new Image() }],
    rotatation: 0,
    x: 50,
    y: 100,
    speed: 0,
    gravity: 0.125,
    thrust: 3.6,
    frame: 0,
    draw: function () {
        let h = this.animations[this.frame].sprite.height;
        let w = this.animations[this.frame].sprite.width;
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotatation * RAD);
        context.drawImage(this.animations[this.frame].sprite, -w / 2, -h / 2);
        context.restore();
    },
    update: function () {
        let r = parseFloat(this.animations[0].sprite.width) / 2;
        switch (state.curr) {
            case state.getReady:
                this.rotatation = 0;
                this.y += frames % 10 == 0 ? Math.sin(frames * RAD) : 0;
                this.frame += frames % 10 == 0 ? 1 : 0;
                break;
            case state.Play:
                this.frame += frames % 5 == 0 ? 1 : 0;
                this.y += this.speed;
                this.setRotation();
                this.speed += this.gravity;
                if (this.y + r >= ground.y || this.collisioned()) {
                    state.curr = state.gameOver;
                }

                break;
            case state.gameOver:
                this.frame = 1;
                if (this.y + r < ground.y) {
                    this.y += this.speed;
                    this.setRotation();
                    this.speed += this.gravity * 2;
                } else {
                    this.speed = 0;
                    this.y = ground.y - r;
                    this.rotatation = 90;
                    if (!sound.played) {
                        sound.die.play();
                        sound.played = true;
                    }
                }

                break;
        }
        this.frame = this.frame % this.animations.length;
    },
    flap: function () {
        if (this.y > 0) {
            sound.flap.play();
            this.speed = -this.thrust;
        }
    },
    setRotation: function () {
        if (this.speed <= 0) {
            this.rotatation = Math.max(-25, (-25 * this.speed) / (-1 * this.thrust));
        } else if (this.speed > 0) {
            this.rotatation = Math.min(90, (90 * this.speed) / (this.thrust * 2));
        }
    },
    collisioned: function () {
        if (!pipe.pipes.length) return;
        let bird = this.animations[0].sprite;
        let x = pipe.pipes[0].x;
        let y = pipe.pipes[0].y;
        let r = bird.height / 4 + bird.width / 4;
        let roof = y + parseFloat(pipe.top.sprite.height);
        let floor = roof + pipe.gap;
        let w = parseFloat(pipe.top.sprite.width);
        if (this.x + r >= x) {
            if (this.x + r < x + w) {
                if (this.y - r <= roof || this.y + r >= floor) {
                    sound.hit.play();
                    return true;
                }
            } else if (pipe.moved) {
                UI.score.curr++;
                sound.score.play();
                pipe.moved = false;
            }
        }
    },
};
const UI = {
    getReady: { sprite: new Image() },
    gameOver: { sprite: new Image() },
    tap: [{ sprite: new Image() }, { sprite: new Image() }],
    score: {
        curr: 0,
        best: 0,
    },
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    frame: 0,
    draw: function () {
        switch (state.curr) {
            case state.getReady:
                this.y = parseFloat(canvas.height - this.getReady.sprite.height) / 2;
                this.x = parseFloat(canvas.width - this.getReady.sprite.width) / 2;
                this.tx = parseFloat(canvas.width - this.tap[0].sprite.width) / 2;
                this.ty = this.y + this.getReady.sprite.height - this.tap[0].sprite.height;
                context.drawImage(this.getReady.sprite, this.x, this.y);
                context.drawImage(this.tap[this.frame].sprite, this.tx, this.ty);
                break;
            case state.gameOver:
                this.y = parseFloat(canvas.height - this.gameOver.sprite.height) / 2;
                this.x = parseFloat(canvas.width - this.gameOver.sprite.width) / 2;
                this.tx = parseFloat(canvas.width - this.tap[0].sprite.width) / 2;
                this.ty = this.y + this.gameOver.sprite.height - this.tap[0].sprite.height;
                context.drawImage(this.gameOver.sprite, this.x, this.y);
                context.drawImage(this.tap[this.frame].sprite, this.tx, this.ty);
                break;
        }
        this.drawFPS();
        this.drawScore();
    },
    drawScore: function () {
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#000000";
        switch (state.curr) {
            case state.Play:
                context.lineWidth = "2";
                context.font = "35px Squada One";
                context.fillText(this.score.curr, canvas.width / 2 - 5, 50);
                context.strokeText(this.score.curr, canvas.width / 2 - 5, 50);
                break;
            case state.gameOver:
                context.lineWidth = "2";
                context.font = "40px Squada One";
                let sc = `SCORE :     ${this.score.curr}`;
                try {
                    this.score.best = Math.max(this.score.curr, localStorage.getItem("best"));
                    localStorage.setItem("best", this.score.best);
                    let bs = `BEST  :     ${this.score.best}`;
                    context.fillText(sc, canvas.width / 2 - 80, canvas.height / 2 + 0);
                    context.strokeText(sc, canvas.width / 2 - 80, canvas.height / 2 + 0);
                    context.fillText(bs, canvas.width / 2 - 80, canvas.height / 2 + 30);
                    context.strokeText(bs, canvas.width / 2 - 80, canvas.height / 2 + 30);
                } catch (e) {
                    context.fillText(sc, canvas.width / 2 - 85, canvas.height / 2 + 15);
                    context.strokeText(sc, canvas.width / 2 - 85, canvas.height / 2 + 15);
                }

                break;
        }
    },
    drawFPS: function () {
        context.font = "14px Squada One";
        context.fillStyle = "black";
        context.fillText("FPS: " + Math.round(fps), 10, 30);
    },
    update: function () {
        if (state.curr == state.Play) return;
        this.frame += frames % 10 == 0 ? 1 : 0;
        this.frame = this.frame % this.tap.length;
    },
};

ground.sprite.src = "resources/Ground.png";
background.sprite.src = "resources/Background.png";
pipe.top.sprite.src = "resources/PipeUp.png";
pipe.bot.sprite.src = "resources/PipeDown.png";
UI.gameOver.sprite.src = "resources/GameOver.png";
UI.getReady.sprite.src = "resources/GetReady.png";
UI.tap[0].sprite.src = "resources/TapFrame1.png";
UI.tap[1].sprite.src = "resources/TapFrame2.png";
bird.animations[0].sprite.src = "resources/BirdFrame1.png";
bird.animations[1].sprite.src = "resources/BirdFrame2.png";
bird.animations[2].sprite.src = "resources/BirdFrame3.png";
bird.animations[3].sprite.src = "resources/BirdFrame1.png";
sound.start.src = "resources/start.wav";
sound.flap.src = "resources/WingsFlapFrame1.mp3";
sound.score.src = "resources/score.wav";

let secondsPassed;
let oldTimeStamp;
let fps;
let gameSpeed;

gameLoop();
function gameLoop(timeStamp) {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    // Calculate fps
    fps = 1 / secondsPassed;

    update();
    draw();
    frames++;
    requestAnimationFrame(gameLoop);
}

function update() {
    bird.update();
    ground.update();
    pipe.update();
    UI.update();
}
function draw() {
    context.fillStyle = "#30c0df";
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.draw();
    pipe.draw();
    bird.draw();
    ground.draw();
    UI.draw();
}

