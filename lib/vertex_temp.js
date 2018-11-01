const Vertex = require('./vertex');

class VertexTemp extends Vertex {
  constructor(options) {
    super(options);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ee7f8a';
    this.ctx.strokeStyle = '#ee7f8a';
    this.ctx.lineWidth = 3;
    this.ctx.shadowBlur = 0;
    this.ctx.globalAlpha = 1;
    this.ctx.arc(this.x, this.y, 8, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

module.exports = VertexTemp;
