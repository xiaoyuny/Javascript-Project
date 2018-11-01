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
    this.selected;
    this.index;

    this.drawStartingVertex();
    this.drawStartingLines();
    this.handleClick();

    this.handleMouseMove = this.handleMouseMove.bind(this);
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
      this.selected = this.selectedEdge(e.offsetX, e.offsetY);
      if (this.selected) {
        const tempVertex = new VertexTemp({
          x: e.offsetX,
          y: e.offsetY,
          ctx: this.ctx
        });
        tempVertex.draw();

        gameCanvas.addEventListener('mousemove', this.handleMouseMove);
      }
    });

    gameCanvas.addEventListener('mouseup', e => {
      const endPos = [e.offsetX, e.offsetY];
      const newVertex = new VertexFull({
        x: e.offsetX,
        y: e.offsetY,
        ctx: this.ctx
      });
      this.allVertex.push(newVertex);
      gameCanvas.removeEventListener('mousemove', this.handleMouseMove);
    });
  }

  handleMouseMove(e) {
    const newVertex = new VertexTemp({
      x: e.offsetX,
      y: e.offsetY,
      ctx: this.ctx
    });

    const edge1 = new Edge({
      ctx: this.ctx,
      vertex1: this.selected[0],
      vertex2: newVertex
    });
    const edge2 = new Edge({
      ctx: this.ctx,
      vertex1: newVertex,
      vertex2: this.selected[1]
    });
    this.ctx.clearRect(0, 0, 500, 500);
    this.drawStartingVertex();
    edge1.draw();
    edge2.draw();
    newVertex.draw();
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
          -800 &&
        (x - vertex1.x) * (y - vertex2.y) - (x - vertex2.x) * (y - vertex1.y) <=
          800
      ) {
        return [vertex1, vertex2];
      }
    }
  }
}

module.exports = GameView;
