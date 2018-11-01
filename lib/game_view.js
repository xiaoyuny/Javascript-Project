const Constants = require('./util/constants');
const VertexFull = require('./vertex_full');
const VertexEmpty = require('./vertex_empty');
const VertexTemp = require('./vertex_temp');
const Edge = require('./edge');

class GameView {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.level = 0;
    this.startingVertexPos = [[150, 250], [250, 250]];
    this.startingVertex = [];

    this.allVertex = [];

    this.drawStartingVertex();
    this.handleClick();
    this.drawStartingLines();
  }

  drawStartingVertex() {
    const width = 500;
    const height = 500;
    this.ctx.lineWidth = 4;

    for (let x = 50; x <= width; x += 100) {
      for (let y = 50; y <= height; y += 100) {
        if (this.isStartingVertexPos(x, y)) {
          let vertex = new VertexFull({ ctx: this.ctx, x, y });
          this.startingVertex.push(vertex);
          this.allVertex.push(vertex);
          vertex.draw();
        } else {
          let vertex = new VertexEmpty({ ctx: this.ctx, x, y });
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

  handleClick() {
    const gameCanvas = document.getElementById('game-canvas');
    gameCanvas.addEventListener('mousedown', e => {
      console.log(e.offsetX, e.offsetY);
      // const mousePos = [e.offsetX, e.offsetY];

      const selected = this.selectedEdge(e.offsetX, e.offsetY);
      if (selected) {
        const tempVertex = new VertexTemp({
          x: e.offsetX,
          y: e.offsetY,
          ctx: this.ctx
        });
        tempVertex.draw();

        const edge1 = new Edge({
          ctx: this.ctx,
          vertex1: selected[0],
          vertex2: tempVertex
        });
        const edge2 = new Edge({
          ctx: this.ctx,
          vertex1: tempVertex,
          vertex2: selected[1]
        });
        this.ctx.clearRect(0, 0, 500, 500);
        this.drawStartingVertex();
        edge1.draw();
        edge2.draw();
      }
    });
  }

  drawStartingLines() {
    let edge = new Edge({
      vertex1: this.startingVertex[0],
      vertex2: this.startingVertex[1],
      ctx: this.ctx
    });
    edge.draw();
  }

  selectedEdge(x, y) {
    for (let i = 0; i < this.allVertex.length; i++) {
      if (i === this.allVertex.length - 1) continue;
      let vertex1 = this.allVertex[i];
      let vertex2 = this.allVertex[i + 1];
      // (x3-x1) * (y3-y2) - (x3-x2) * (y3-y1) === 0
      if (
        (x - vertex1.x) * (y - vertex2.y) - (x - vertex2.x) * (y - vertex1.y) >=
          -3600 &&
        (x - vertex1.x) * (y - vertex2.y) - (x - vertex2.x) * (y - vertex1.y) <=
          3600
      ) {
        return [vertex1, vertex2];
      }
    }
  }
}

module.exports = GameView;
