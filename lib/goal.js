const Constants = require('./util/constants');

class Goal {
  constructor(ctx) {
    this.draw(ctx);
  }

  draw(ctx) {
    const width = 216;
    const height = 216;
    ctx.lineWidth = 3.5;
    const p = 15;

    for (let x = 30; x <= width; x += 42) {
      for (let y = 30; y <= height; y += 42) {
        ctx.beginPath();
        this.emptyDot(ctx, x, y);
      }
    }
  }

  emptyDot(ctx, x, y) {
    // ctx.strokeStyle = Constants.VERTEX_PINK;
    ctx.strokeStyle = 'grey';
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

module.exports = Goal;
