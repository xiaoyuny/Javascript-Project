const Constants = require('./util/constants');
const KnotFull = require('./vertex_full');
const KnotEmpty = require('./vertex_empty');
const Edge = require('./edge');

class GameView {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.level = 0;
    this.startingVertexPos = [[50, 150], [50, 250]];

    this.startingVertex = [];
    this.drawStartingVertex(ctx);

    this.enableCreateVertex();
  }

  drawStartingVertex(ctx) {
    const width = 500;
    const height = 500;
    ctx.lineWidth = 4;

    for (let x = 50; x <= width; x += 100) {
      for (let y = 50; y <= height; y += 100) {
        if (this.isStartingVertexPos(x, y)) {
          let vertex = new KnotFull({
            ctx,
            x,
            y
          });
          this.startingVertex.push(vertex);
          vertex.draw();
        } else {
          let vertex = new KnotEmpty({ ctx, x, y });
          vertex.draw();
        }
      }
    }
  }

  isStartingVertexPos(x, y) {
    for (let i = 0; i < this.startingVertexPos.length; i++) {
      let currentVertex = this.startingVertexPos[i];
      if (x === currentVertex[0] && y === currentVertex[1]) return true;
    }
    return false;
  }

  enableCreateVertex() {
    const gameCanvas = document.getElementById('game-canvas');
    gameCanvas.addEventListener('mousedown', e => {
      console.log(e.offsetX, e.offsetY);
      let vertex = new VertexFull({
        x: e.offsetX,
        y: e.offsetY,
        ctx: this.ctx
      });
      vertex.draw();
    });
  }

  drawStartingLines() {
    this.startingVertex.forEach(vertex => {});
  }
}

module.exports = GameView;
