var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
//Добовление картинок 
bird.src = "img/bird.png";
fg.src = "img/fg.png";
bg.src = "img/bg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Sound 
var fly = new Audio();
var score_audio = new Audio();
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3"
var gap = 70;
// Подъём птички при нажатии на клавишу 
document.addEventListener("keydown", muveUp);
function muveUp() {
    yPos -= 25;
    fly.play();
}

//Блоки 
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

var score = 0;
//Позиция птички 
var xPos = 10;
var yPos = 150;
var graw = 1.5;



function draw() {
    ctx.drawImage(bg, 0, 0);
    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
        if (pipe[i].x == 75) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        //Рестарт игры 
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload();
        }
        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos += graw;
    ctx.fillStile = "#555";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт : " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}
pipeBottom.onload = draw;

