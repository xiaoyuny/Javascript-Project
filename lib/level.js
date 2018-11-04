const Stats = require('./util/stats');
const Constants = require('./util/constants');

class Level {
  constructor(ctx, stage) {
    this.ctx = ctx;
    this.stage = stage;
    this.goal = Stats.goal[this.stage];

    this.drawFinal();
  }

  drawFinal() {
    this.drawVertex();
    for (let i = 0; i < this.goal.length - 1; i++) {
      const vertexPos1 = this.goal[i];
      const vertexPos2 = this.goal[i + 1];
      this.drawEdge([vertexPos1, vertexPos2]);
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
        this.ctx.arc(x, y, 6, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
      }
    }
  }

  drawEdge(vertexes) {
    vertexes = vertexes.map(el => el.map(num => 30 + num * 42));

    this.ctx.strokeStyle = Constants.VERTEX_PINK;
    this.ctx.shadowColor = Constants.VERTEX_PINK;
    this.ctx.lineWidth = 9;
    this.ctx.shadowBlur = 10;
    this.ctx.globalAlpha = 0.4;
    this.ctx.beginPath();
    this.ctx.moveTo(vertexes[0][0], vertexes[0][1]);
    this.ctx.lineTo(vertexes[1][0], vertexes[1][1]);
    this.ctx.stroke();
  }
}

module.exports = Level;
