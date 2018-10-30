class Board {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
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
    ctx.fillStyle = '#ee7f8a';
    ctx.strokeStyle = '#ee7f8a';
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
}

module.exports = Board;
