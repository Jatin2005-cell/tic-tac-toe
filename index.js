let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// ✅ Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// ✅ Function to enable all boxes (used for reset)
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// ✅ Function to show winner message on screen
const showWinner = (winner) => {
  msg.innerText = `${winner} has won the game! 🎉`;
  msg.innerText.color = 
  msgcontainer.classList.remove("hide");
  disableBoxes();
};

// ✅ Check for a win or draw
const checkWin = () => {
  for (let pattern of winPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }

  // Check for draw
  let draw = true;
  boxes.forEach((box) => {
    if (box.innerText === "") draw = false;
  });

  if (draw) {
    msg.innerText = "It's a Draw! 🤝";
    msgcontainer.classList.remove("hide");
  }
};

// ✅ Main game logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWin();
  });
});

// ✅ Reset game function
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgcontainer.classList.add("hide");
};

// ✅ Event listeners
newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
