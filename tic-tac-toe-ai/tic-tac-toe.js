let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector('.reset-btn');
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnText = document.querySelector("#turn");

let turnO = true; 
let gameOver = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (gameOver || !turnO || box.innerText !== "") return;
    box.innerText = "O";
    box.disabled = true;
    turnO = false;
    checkWinner();

    if (!gameOver) {
      turnText.innerText = "AI's Turn (X)";
      setTimeout(botMove, 500); 
    }
  });
});
const botMove = () => {
  let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
  if (emptyBoxes.length === 0 || gameOver) return;
  let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  randomBox.innerText = "X";
  randomBox.disabled = true;

  checkWinner();
  if (!gameOver) {
    turnO = true;
    turnText.innerText = "Your Turn (O)";
  }
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return;
    }
  }
  let isDraw = [...boxes].every(box => box.innerText !== "");
  if (isDraw) {
    showDraw();
  }
};

const showWinner = (winner) => {
  msg.innerText = `🎉 ${winner === "O" ? "You Win!" : "AI Wins!"}`;
  msgContainer.classList.remove("hide");
  gameOver = true;
  disableAllBoxes();
};

const showDraw = () => {
  msg.innerText = "😐 It's a Draw!";
  msgContainer.classList.remove("hide");
  gameOver = true;
};

const disableAllBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const resetGame = () => {
  turnO = true;
  gameOver = false;
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
  turnText.innerText = "Your Turn (O)";
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);


