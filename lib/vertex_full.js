const Vertex = require('./vertex');

class VertexFull extends Vertex {
  constructor(options) {
    super(options);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    this.ctx.fill();
    // this.ctx.stroke();
    // this.drawCross();
    this.ctx.beginPath();

    this.ctx.moveTo(this.x - 7, this.y - 7);
    this.ctx.lineTo(this.x + 7, this.y + 7);

    this.ctx.moveTo(this.x + 7, this.y - 7);
    this.ctx.lineTo(this.x - 7, this.y + 7);
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }

  drawCross() {}
}

module.exports = VertexFull;
