let gameSeq = [];
let userSeq = [];
let highScore = 0;
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");
//STEP-1
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}
function wrongFlash(){
    let body = document.querySelector("body");
    body.classList.add("wrongFlash");
    setTimeout(function(){
        body.classList.remove("wrongFlash");
    },150);
}
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4);
    let randColor = btns[ranIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function check(idx) {
    // console.log("current level:",level);
    // let idx = level-1;

    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        wrongFlash();
        h2.innerHTML= `Game Over! Your score was <b>${level}</b> <br> Press any key to restart.`;
        highScore = Math.max(highScore,level);
        h3.innerHTML = `High Score:<br><b>${highScore}</b>`;
        console.log(`${highScore}`);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userSeq);
    check(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level=0;
}