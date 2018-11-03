const Game = require('./game');
const GameView = require('./game_view');
const Level = require('./level');

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');
  gameCanvas.width = 450;
  gameCanvas.height = 450;

  const levelCanvas = document.getElementById('level-canvas');
  levelCanvas.width = 230;
  levelCanvas.height = 230;

  const gameCtx = gameCanvas.getContext('2d');
  const levelCtx = levelCanvas.getContext('2d');

  const game = new Game(gameCtx, levelCtx);
});
