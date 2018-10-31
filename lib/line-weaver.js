const Board = require('./board');
const Goal = require('./goal');

const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');
  gameCanvas.width = 500;
  gameCanvas.height = 500;

  const goalCanvas = document.getElementById('goal-canvas');
  goalCanvas.width = 250;
  goalCanvas.height = 250;

  const gameCtx = gameCanvas.getContext('2d');
  const goalCtx = goalCanvas.getContext('2d');

  const board = new Board();
  const goal = new Goal(goalCtx);

  board.drawBoard(gameCtx);
});
