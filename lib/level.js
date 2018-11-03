const Stats = require('./util/stats');

class Level {
  constructor(ctx) {
    this.ctx = ctx;
    this.stage = 1;
    this.final = Stats.final[this.stage];

    this.drawFinal();
  }

  drawFinal() {
    this.drawVertex();
    for (let i = 0; i < this.final.length - 1; i++) {
      const vertexPos1 = this.final[i];
      const vertexPos2 = this.final[i + 1];
      this.drawEdge(vertexPos1, vertexPos2);
    }
  }

  drawVertex() {
    const width = 216;
    const height = 216;
    this.ctx.lineWidth = 3.5;

    for (let x = 30; x <= width; x += 42) {
      for (let y = 30; y <= height; y += 42) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'lightgrey';
        this.ctx.fillStyle = 'lightgrey';
        this.ctx.arc(x, y, 8, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
      }
    }
  }

  drawEdge(vertexPos1, vertexPos2) {
    console.log('drawing');
    this.ctx.strokeStyle = 'pink';
    this.ctx.shadowColor = 'pink';
    this.ctx.lineWidth = 9;
    this.ctx.shadowBlur = 10;
    this.ctx.globalAlpha = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(vertexPos1[0], vertexPos1[1]);
    this.ctx.lineTo(vertexPos2[0], vertexPos2[1]);
    this.ctx.stroke();
  }
}

module.exports = Level;
