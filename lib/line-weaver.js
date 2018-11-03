const GameView = require('./game_view');
const Goal = require('./goal');

const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');
  gameCanvas.width = 450;
  gameCanvas.height = 450;

  const goalCanvas = document.getElementById('goal-canvas');
  goalCanvas.width = 230;
  goalCanvas.height = 230;

  const gameCtx = gameCanvas.getContext('2d');
  const goalCtx = goalCanvas.getContext('2d');

  const gameView = new GameView(gameCtx);
  const goal = new Goal(goalCtx);
});
