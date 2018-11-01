const Constants = require('./util/constants');

class Edge {
  constructor(options) {
    this.vertex1 = options.vertex1;
    this.vertex2 = options.vertex2;
    this.ctx = options.ctx;
  }

  draw() {
    this.ctx.strokeStyle = '#e4cd00';
    this.ctx.shadowColor = '#e4cd00';
    this.ctx.lineWidth = 12;
    this.ctx.shadowBlur = 5;
    this.ctx.globalAlpha = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.vertex1.x, this.vertex1.y);
    this.ctx.lineTo(this.vertex2.x, this.vertex2.y);
    this.ctx.stroke();
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
