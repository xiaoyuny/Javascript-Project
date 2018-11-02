const Edge = require('./edge');
const Constants = require('./util/constants');

class EdgeOverlapping extends Edge {
  constructor(options) {
    super(options);
  }

  draw() {
    this.ctx.strokeStyle = Constants.OVERLAPPING_EDGE_RED;
    this.ctx.shadowColor = Constants.OVERLAPPING_EDGE_RED;
    this.ctx.lineWidth = 12;
    this.ctx.shadowBlur = 5;
    this.ctx.globalAlpha = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.vertex1.x, this.vertex1.y);
    this.ctx.lineTo(this.vertex2.x, this.vertex2.y);
    this.ctx.stroke();

    this.drawX();
  }

  drawX() {
    this.ctx.beginPath();

    this.ctx.moveTo(
      (this.vertex1.x + this.vertex2.x) / 2 - 15,
      (this.vertex1.y + this.vertex2.y) / 2 - 15
    );
    this.ctx.lineTo(
      (this.vertex1.x + this.vertex2.x) / 2 + 15,
      (this.vertex1.y + this.vertex2.y) / 2 + 15
    );

    this.ctx.moveTo(
      (this.vertex1.x + this.vertex2.x) / 2 + 15,
      (this.vertex1.y + this.vertex2.y) / 2 - 15
    );
    this.ctx.lineTo(
      (this.vertex1.x + this.vertex2.x) / 2 - 15,
      (this.vertex1.y + this.vertex2.y) / 2 + 15
    );
    this.ctx.lineWidth = 7;
    this.ctx.strokeStyle = 'white';

    this.ctx.stroke();
  }
}

module.exports = EdgeOverlapping;
