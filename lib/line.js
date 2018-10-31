const Constants = require('./util/constants');

class Line {
  constructor(options) {
    this.knot1 = options.knot1;
    this.knot2 = options.knot2;
    this.idx = options.idx;
  }

  draw(ctx, lines) {
    if (this.isIntersecting(lines)) {
      ctx.strokeStyle = Constants.LINE_INTERSECTING;
      ctx.shadowColor = Constants.LINE_INTERSECTING;
    } else {
      ctx.strokeStyle = Constants.BLACK;
      ctx.shadowColor = Constants.LINE_FREE;
    }
    ctx.lineWidth = 5;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(this.line1.x, this.line1.y);
    ctx.lineTo(this.line2.x, this.line2.y);
    ctx.stroke();
  }

  isIntersecting() {}

  slope() {
    if (this.knot1.x === this.knot2.x) {
      return 100000;
    } else if (this.knot1.x < this.knot2.x) {
      return (this.knot2.y - this.knot1.y) / (this.knot2.x - this.knot1.x);
    } else {
      return (this.knot1.y - this.knot2.y) / (this.knot1.x - this.knot2.x);
    }
  }
}

module.exports = Line;
