
let boxes = document.querySelectorAll(".box");
let Resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const undoButton = document.getElementById('undoButton');

let turnO = true;  // playerX //playerO
let count = 0; // to track draw
let history = [];
let currentPlayer = 'O';
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetgame = () => {
    turnO = true;
    count = 0;
    history = [];
    enableBoxes();
    msgcontainer.classList.add("hide");
};

undoButton.addEventListener('click', () => {
    if (history.length > 0) {
        const lastMove = history.pop();
        boxes[lastMove.index].textContent = '';
        boxes[lastMove.index].disabled = false;
        turnO = lastMove.player === 'X';
        currentPlayer = lastMove.player;
        count--;
        msgcontainer.classList.add("hide");
    }
});

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === '') {
            if (turnO) {
                box.innerText = "O";
                currentPlayer = 'O';
            } else {
                box.innerText = "X";
                currentPlayer = 'X';
            }
            box.disabled = true;
            history.push({ player: currentPlayer, index });
            turnO = !turnO;
            count++;
            let isWinner = checkwinner();
            if (count === 9 && !isWinner) {
                gameDraw();
            }
        }
    });
});

const gameDraw = () => {
    msg.innerText = "It's a draw!";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkwinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
        }
    }
    return false;
};

newgamebtn.addEventListener("click", resetgame);
Resetbtn.addEventListener("click", resetgame);