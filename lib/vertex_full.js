const Vertex = require('./vertex');
const Constants = require('./util/constants');

class VertexFull extends Vertex {
  constructor(options) {
    super(options);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    this.ctx.fillStyle = Constants.VERTEX_PINK;
    this.ctx.strokeStyle = Constants.VERTEX_PINK;
    this.ctx.lineWidth = 5;
    this.ctx.globalAlpha = 1;
    this.ctx.fill();
    this.ctx.beginPath();

    this.ctx.moveTo(this.x - 7, this.y - 7);
    this.ctx.lineTo(this.x + 7, this.y + 7);

    this.ctx.moveTo(this.x + 7, this.y - 7);
    this.ctx.lineTo(this.x - 7, this.y + 7);
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }
}

module.exports = VertexFull;
