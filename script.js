let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

const btns = ["red", "yellow", "green", "purple"];

const levelDisplay = document.querySelector("#level");
const subtitle = document.querySelector(".subtitle");

// Start Game
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Level Up
function levelUp() {
    userSeq = [];
    level++;

    levelDisplay.innerText = level;
    subtitle.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];

    gameSeq.push(randomColor);

    let randomBtn = document.querySelector(`#${randomColor}`);
    gameFlash(randomBtn);
}

// Game Flash
function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

// User Flash
function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 150);
}

// Button Click
function btnPress() {
    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAnswer(userSeq.length - 1);
}

// Check Answer
function checkAnswer(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {

            setTimeout(() => {
                levelUp();
            }, 1000);
        }

    } else {

        subtitle.innerHTML =
            `Game Over! Score: <b>${level}</b><br>Press any key to restart`;

        document.body.style.backgroundColor = "red";

        setTimeout(() => {
            document.body.style.background =
                "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)";
        }, 200);

        reset();
    }
}

// Add Event Listeners
let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset Game
function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}