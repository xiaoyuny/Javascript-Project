const Constants = require('./util/constants');

class Edge {
  constructor(options) {
    this.vertex1 = options.vertex1;
    this.vertex2 = options.vertex2;
    this.idx = options.idx;
  }

  draw(ctx, edges) {
    if (this.isIntersecting(edges)) {
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
    if (this.vertex1.x === this.vertex2.x) {
      return 100000;
    } else if (this.vertex1.x < this.vertex2.x) {
      return (
        (this.vertex2.y - this.vertex1.y) / (this.vertex2.x - this.vertex1.x)
      );
    } else {
      return (
        (this.vertex1.y - this.vertex2.y) / (this.vertex1.x - this.vertex2.x)
      );
    }
  }
}

module.exports = Edge;
