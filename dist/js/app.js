'use strict';

let cells = [...document.querySelectorAll('.cell')];
let playerX = document.querySelector('.player-X');
let toWinsPlayerX = document.getElementById('pointsX');
let playerO = document.querySelector('.player-O');
let toWinsPlayerO = document.getElementById('pointsO');
let modal = document.getElementById('modal');
let result = document.getElementById('result');
let btnClose = document.getElementById('btn-close');
let btnReset = document.getElementById('btn-reset');
let array = new Array(cells.length);
let firstPlayer = 'X';
let secondPlayer = 'O';
let winsPlayerX = 0;
let winsPlayerO = 0;
let turn = 1;
let winner = false;

function closeModal() {
  modal.style.zIndex = -100;
  modal.style.opacity = 0;
}

function openModal(player) {
  modal.style.zIndex = 200;
  modal.style.opacity = 1;
  if (player === 'Empate') {
    result.innerHTML = `${player}`;
    [firstPlayer, secondPlayer] = [secondPlayer, firstPlayer];
  } else if (player === 'X' || player === 'O') {
    result.innerHTML = `Ganador <span>${player}</span>`;
  }
  btnClose.addEventListener('click', closeModal);
}

function checkWinner(index, player) {
  array[index] = player;
  if (
    array[0] === player && array[1] === player && array[2] === player ||
    array[3] === player && array[4] === player && array[5] === player ||
    array[6] === player && array[7] === player && array[8] === player ||
    array[0] === player && array[3] === player && array[6] === player ||
    array[1] === player && array[4] === player && array[7] === player ||
    array[2] === player && array[5] === player && array[8] === player ||
    array[0] === player && array[4] === player && array[8] === player ||
    array[2] === player && array[4] === player && array[6] === player
  ) {
    winner = true;
    firstPlayer = player;
    if (firstPlayer === 'X') {
      winsPlayerX++;
      toWinsPlayerX.innerHTML = winsPlayerX;
      secondPlayer = 'O';
    } else {
      winsPlayerO++;
      toWinsPlayerO.innerHTML = winsPlayerO;
      secondPlayer = 'X';
    }

    openModal(player);
  }
}

function setTurn() {
  if (winner === false) {
    if (turn === 1 || turn === 3 || turn === 5 || turn === 7 || turn === 9) {
      if (firstPlayer === 'X') {
        playerX.classList.add('current');
        playerO.classList.remove('current');
      } else {
        playerO.classList.add('current');
        playerX.classList.remove('current');
      }
    } else {
        if (firstPlayer === 'X') {
          playerO.classList.add('current');
          playerX.classList.remove('current');
        } else {
          playerX.classList.add('current');
          playerO.classList.remove('current');
      }
    }
  }
}

function fillCell(e) {
  let index = cells.indexOf(e.target);
  if (turn % 2 === 1) {
    if (firstPlayer === 'X') {
      e.target.firstElementChild.classList.remove('hide');
    } else {
      e.target.lastElementChild.classList.remove('hide');
    }
    checkWinner(index, firstPlayer);
  } else {
    if (firstPlayer === 'X') {
      e.target.lastElementChild.classList.remove('hide');
    } else {
      e.target.firstElementChild.classList.remove('hide');
    }
    checkWinner(index, secondPlayer);
  }
  e.target.removeEventListener('click', fillCell);
  if (turn === 9 && winner === false) {
    openModal('Empate');
  } else {
    turn++;
    setTurn(turn);
  }
}

function reset() {
  for (let i = 0; i < array.length; i++) {
    array[i] = '';
    cells[i].firstElementChild.classList.add('hide');
    cells[i].lastElementChild.classList.add('hide');
  }
  turn = 1;
  winner = false;
  init();
} 

function init() {
  setTurn();
  for (let cell of cells) {
    cell.addEventListener('click', fillCell);
  }

  btnReset.addEventListener('click', reset);
}

window.onload = () => init(turn, firstPlayer);
