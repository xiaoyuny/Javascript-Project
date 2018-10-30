class Knot {
  constructor(options) {
    this.index = options.index;
    this.x = options.x;
    this.y = options.y;
    this.color = Constants.COLOR;
    this.selected = false;
  }

  pos() {
    return [this.x, this.y];
  }

  drawSelected(ctx, x, y) {
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#ee7f8a';
    ctx.strokeStyle = '#ee7f8a';
    ctx.fill();
    ctx.stroke();
  }

  drawEmpty(ctx, x, y) {
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.stroke();
  }

  drawCross(ctx, x, y) {
    ctx.beginPath();

    ctx.moveTo(x - 7, y - 7);
    ctx.lineTo(x + 7, y + 7);

    ctx.moveTo(x + 7, y - 7);
    ctx.lineTo(x - 7, y + 7);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }
}

module.exports = Knot;
