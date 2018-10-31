const gameView = require('./game_view');
const Edge = require('./edge');

class Game {
  constructor(options) {
    this.level = options.level || 0;
  }

  hasWon() {}

  buildGraph() {}

  resetCurrentLevel() {}

  undoLastMove() {}
}
