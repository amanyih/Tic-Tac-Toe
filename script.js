"use strict";

const allCells = document.querySelectorAll(".each-cell");
const players = document.querySelectorAll(".player");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const state = document.querySelector(".state");
const scoreBoard = document.querySelector(".score-board");
const currentWinner = document.querySelector(".current-winner");
const againBtn = document.querySelector(".btn-again");
const newBtn = document.querySelector(".btn-new");
const score1 = document.querySelector(".score-1");
const score2 = document.querySelector(".score-2");
const score0 = document.querySelector(".score-0");

const player1sb = document.querySelector(".player1sb");
const drawsb = document.querySelector(".drawsb");
const player2sb = document.querySelector(".player2sb");

console.log(scoreBoard);

console.log(allCells);
console.log(players);

let count = 0;
let arr = Array(9).fill("null");
let player1score = 0;
let player2score = 0;
let drawScore = 0;

let gameEnd;

const winningConditions = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
];

const hasWon = function (lst, cur) {
  let con;
  for (let i = 0; i < winningConditions.length; i++) {
    con = winningConditions[i];
    if (con.includes(cur)) {
      if (lst[con[0]] == lst[con[1]] && lst[con[0]] == lst[con[2]]) {
        console.log(`player ${lst[cur]} won`);
        return true;
      }
    }
  }
  return false;
};

const againFunc = function () {
  allCells.forEach((cell) => {
    cell.lastElementChild.classList.remove("x");
    cell.lastElementChild.classList.remove("o");
  });
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  count = 0;
  arr = Array(9).fill("null");
  players[0].classList.add("active");
  players[1].classList.remove("active");
};
const newFunc = function () {
  allCells.forEach((cell) => {
    cell.lastElementChild.classList.remove("x");
    cell.lastElementChild.classList.remove("o");
  });
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  count = 0;
  arr = Array(9).fill("null");
  players[0].classList.add("active");
  players[1].classList.remove("active");
  player1score = 0;
  player2score = 0;
  drawScore = 0;
  score0.textContent = `${drawScore}`;
  score1.textContent = `${player1score}`;
  score2.textContent = `${player2score}`;
  player1sb.textContent = `Player - 1 : ${player1score}`;
  drawsb.textContent = `Draw : ${drawScore}`;
  player2sb.textContent = `Player - 2 : ${player2score}`;
};

const gameEnded = function (winner) {
  if (winner == 0) {
    state.textContent = "It's a Draw";
    currentWinner.textContent = "🤝";
    score0.textContent = `${drawScore}`;
  } else {
    state.textContent = "🎉Winner🎉";
    currentWinner.textContent = `Player - ${winner}`;
    if (winner == 1) {
      score1.textContent = `${player1score}`;
    } else {
      score2.textContent = `${player2score}`;
    }
  }
  player1sb.textContent = `Player - 1 : ${player1score}`;
  drawsb.textContent = `Draw : ${drawScore}`;
  player2sb.textContent = `Player - 2 : ${player2score}`;

  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};

allCells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (count % 2 == 0) {
      if (
        !cell.lastElementChild.classList.contains("o") &&
        !cell.lastElementChild.classList.contains("x")
      ) {
        cell.lastElementChild.classList.add("x");
        count++;
        players[0].classList.remove("active");
        players[1].classList.add("active");
        arr[index] = "x";
        gameEnd = hasWon(arr, index);
        console.log(gameEnd);
        if (gameEnd) {
          player1score += 1;
          gameEnded(1);
        } else if (count == 9) {
          drawScore += 1;
          gameEnded(0);
        }
      }
    } else {
      if (
        !cell.lastElementChild.classList.contains("o") &&
        !cell.lastElementChild.classList.contains("x")
      ) {
        cell.lastElementChild.classList.add("o");
        count++;
        players[1].classList.remove("active");
        players[0].classList.add("active");
        arr[index] = "o";
        gameEnd = hasWon(arr, index);
        if (gameEnd) {
          player2score += 1;
          gameEnded(2);
        } else if (count == 9) {
          drawScore += 1;
          gameEnded(0);
        }
      }
    }
  });
});

againBtn.addEventListener("click", againFunc);
newBtn.addEventListener("click", newFunc);
