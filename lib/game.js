const board = require('./board');
const line = require('./line');

class Game {
  constructor(options) {
    this.level = options.level || 0;
  }

  hasWon() {}

  buildGraph() {}

  resetCurrentLevel() {}

  undoLastMove() {}
}
