const Constants = require('./util/constants');

class Edge {
  constructor(options) {
    this.vertex1 = options.vertex1;
    this.vertex2 = options.vertex2;
    this.ctx = options.ctx;
  }

  draw() {
    this.ctx.strokeStyle = Constants.VALID_EDGE_YELLOW;
    this.ctx.shadowColor = Constants.VALID_EDGE_YELLOW;
    this.ctx.lineWidth = 12;
    this.ctx.shadowBlur = 5;
    this.ctx.globalAlpha = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.vertex1.x, this.vertex1.y);
    this.ctx.lineTo(this.vertex2.x, this.vertex2.y);
    this.ctx.stroke();
  }

  equalYes(edge) {
    return (
      (this.vertex1.equalYes(edge.vertex1) &&
        this.vertex2.equalYes(edge.vertex2)) ||
      (this.vertex2.equalYes(edge.vertex1) &&
        this.vertex1.equalYes(edge.vertex2))
    );
  }
}

module.exports = Edge;
