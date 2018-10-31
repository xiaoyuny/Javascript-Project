const Knot = require('./knot');

class KnotEmpty extends Knot {
  constructor(options) {
    super(options);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ee7f8a';
    this.ctx.strokeStyle = '#ee7f8a';
    this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

module.exports = KnotEmpty;
