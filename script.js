"use strict";

const allCells = document.querySelectorAll(".each-cell");
const allX = document.querySelectorAll(".x");
const players = document.querySelectorAll(".player");

console.log(allCells);
console.log(players);

let count = 0;

const game = function () {
  allCells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (count % 2 == 0) {
        if (
          !cell.lastElementChild.classList.contains("o") &&
          !cell.lastElementChild.classList.contains("x")
        ) {
          cell.lastElementChild.classList.add("x");
          count++;
        }
        players[0].classList.remove("active");
        players[1].classList.add("active");
      } else {
        if (
          !cell.lastElementChild.classList.contains("o") &&
          !cell.lastElementChild.classList.contains("x")
        ) {
          cell.lastElementChild.classList.add("o");
          count++;
        }
        players[1].classList.remove("active");
        players[0].classList.add("active");
      }

      if (count == 5) {
        return 0;
      }
    });
  });
};

let something = game();

console.log(something);
