class Goal {
  constructor(ctx) {
    this.draw(ctx);
  }

  draw(ctx) {
    const width = 240;
    const height = 240;
    ctx.lineWidth = 3.5;
    const p = 15;

    for (let x = 33; x <= width; x += 46) {
      for (let y = 33; y <= height; y += 46) {
        ctx.beginPath();
        this.emptyDot(ctx, x, y);
      }
    }
  }

  emptyDot(ctx, x, y) {
    ctx.strokeStyle = '#ee7f8a';
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

module.exports = Goal;
