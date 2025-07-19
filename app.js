let boxes = document.querySelectorAll(".box");
const container = document.querySelector(".container");
let games = document.querySelector(".game");
// let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame-btn");

// turns predict
let turnO = true;
let movecount = 0;

//winning patterns
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
//Game restart
//Game reset
const reset = () => {
  movecount = 0;
  turnO = true;
  enableBoxes();
  games.classList.remove("hide");
  winnerTitle.classList.add("hide");
};

newGameBtn.addEventListener("click", reset);

//enable boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// disablebox on winning
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

//winnerTemplate

let winnerTitle = document.createElement("h3");
winnerTitle.style.color = "#ffffc7";
winnerTitle.style.fontSize = "8vmin";

const showWinner = (winner) => {
  winnerTitle.innerText = `${winner}`;
  games.classList.add("hide");
  container.append(winnerTitle);
  disableBoxes();
  winnerTitle.classList.remove("hide");
};

//winnerlogic
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(`${pos1} WINS!!`);
      return true;
    }
  }
  return false;
};

// click logic

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }
    box.disabled = true;
    box.classList.remove("preview");
    movecount++;

    const hasWinner = checkWinner();

    if (!hasWinner && movecount == 9) {
      showWinner("It's a draw");
    }

    turnO = !turnO;
  });

  box.addEventListener("mouseenter", () => {
    if (!box.disabled && box.innerText === "") {
      box.classList.add("preview");
      box.innerText = turnO ? "O" : "X";
    }
  });

  box.addEventListener("mouseleave", () => {
    if (box.classList.contains("preview")) {
      box.innerText = "";
      box.classList.remove("preview");
    }
  });
});
