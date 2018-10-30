const Game = require('./game');
const Line = require('./line');

class GameView {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.level = options.level || 0;
  }

  gameLevel() {
    this.game = new Game({ level: this.level });

    // render
  }

  playGame() {}

  levelUp() {}
}
