const Constants = require('./util/constants');

class Board {
  constructor(game, ctx, options) {
    this.ctx = ctx;
    this.game = game;
    this.level = 0;

    this.drawBoard();
  }

  drawBoard(ctx) {
    const width = 500;
    const height = 500;
    ctx.lineWidth = 4;
    const p = 15;

    for (let x = 48; x <= width; x += 100) {
      for (let y = 48; y <= height; y += 100) {
        ctx.beginPath();
        this.filledDot(ctx, x, y);
        this.drawX(ctx, x, y);
      }
    }
  }

  emptyDot(ctx, x, y) {
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.stroke();
  }

  filledDot(ctx, x, y) {
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = Constants.KNOT_COLOR;
    ctx.strokeStyle = Constants.KNOT_COLOR;
    ctx.fill();
    ctx.stroke();
  }

  drawX(ctx, x, y) {
    ctx.beginPath();

    ctx.moveTo(x - 7, y - 7);
    ctx.lineTo(x + 7, y + 7);

    ctx.moveTo(x + 7, y - 7);
    ctx.lineTo(x - 7, y + 7);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

  attach() {}

  isValidMove() {}

  gameLevel() {
    this.game = new Game({ level: this.level });

    // render
  }

  playGame() {}

  levelUp() {}
}

module.exports = Board;
