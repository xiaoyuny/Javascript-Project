const VertexFull = require('./vertex_full');
const VertexEmpty = require('./vertex_empty');
const VertexTemp = require('./vertex_temp');
const Edge = require('./edge');
const EdgeOverlapping = require('./edge_overlapping');

class GameView {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.level = 0;
    this.startingVertexPos = [[150, 250], [350, 250]];
    this.FullVertex = this.initializeStartingVertex();
    this.allVertexPos = this.populateVertex();
    this.selected;
    this.index;

    this.drawVertex();
    this.drawlines();
    this.handleClick();

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  // Event listeners

  handleClick() {
    const gameCanvas = document.getElementById('game-canvas');

    gameCanvas.addEventListener('mousedown', e => {
      this.selected = this.selectedEdge(e.offsetX, e.offsetY);

      if (this.selected) {
        const newVertex = new VertexTemp({
          x: e.offsetX,
          y: e.offsetY,
          ctx: this.ctx
        });
        newVertex.draw();

        gameCanvas.addEventListener('mousemove', this.handleMouseMove);
        gameCanvas.addEventListener('mouseup', this.handleMouseUp);
      }
    });
  }

  handleMouseUp(e) {
    const gameCanvas = document.getElementById('game-canvas');

    for (let i = 0; i < this.allVertexPos.length; i++) {
      let pos = this.allVertexPos[i];
      if (
        pos[0] <= e.offsetX + 30 &&
        pos[0] >= e.offsetX - 30 &&
        pos[1] <= e.offsetY + 30 &&
        pos[1] >= e.offsetY - 30
      ) {
        const newVertex = new VertexFull({
          x: pos[0],
          y: pos[1],
          ctx: this.ctx
        });

        const prevVertex = this.FullVertex[this.index];
        const nextVertex = this.FullVertex[this.index + 1];

        if (
          this.hasConflicts(prevVertex, newVertex) ||
          this.hasConflicts(nextVertex, newVertex) ||
          this.selfConflicting(prevVertex, newVertex, nextVertex)
        ) {
          break;
        } else {
          this.FullVertex = this.FullVertex.slice(0, this.index + 1)
            .concat([newVertex])
            .concat(this.FullVertex.slice(this.index + 1));

          break;
        }
      }
    }

    this.index = undefined;

    this.ctx.clearRect(0, 0, 500, 500);
    this.drawVertex();
    this.drawlines();

    gameCanvas.removeEventListener('mousemove', this.handleMouseMove);
    gameCanvas.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(e) {
    const newVertex = new VertexTemp({
      x: e.offsetX,
      y: e.offsetY,
      ctx: this.ctx
    });

    let edge1, edge2;

    if (this.hasConflicts(this.selected[0], newVertex)) {
      edge1 = new EdgeOverlapping({
        ctx: this.ctx,
        vertex1: this.selected[0],
        vertex2: newVertex
      });
    } else {
      edge1 = new Edge({
        ctx: this.ctx,
        vertex1: this.selected[0],
        vertex2: newVertex
      });
    }

    if (this.hasConflicts(this.selected[1], newVertex)) {
      edge2 = new EdgeOverlapping({
        ctx: this.ctx,
        vertex1: this.selected[1],
        vertex2: newVertex
      });
    } else {
      edge2 = new Edge({
        ctx: this.ctx,
        vertex1: newVertex,
        vertex2: this.selected[1]
      });
    }
    this.ctx.clearRect(0, 0, 500, 500);

    this.drawVertex();
    this.drawlines();
    newVertex.draw();
    edge1.draw();
    edge2.draw();
  }

  // helpers

  hasConflicts(edgeVertex1, edgeVertex2) {
    const result = [];
    for (let i = 0; i < this.FullVertex.length; i++) {
      if (i === this.FullVertex.length - 1) continue;
      if (i === this.index) continue;
      const boardVertex1 = this.FullVertex[i];
      const boardVertex2 = this.FullVertex[i + 1];

      const vertex_array = [
        edgeVertex1,
        boardVertex1,
        edgeVertex2,
        boardVertex2
      ];
      const convolution = [];

      for (let i = 0; i < 4; i++) {
        const vertex1 = vertex_array[i];
        const vertex2 = vertex_array[(i + 1) % 4];
        const vertex3 = vertex_array[(i + 2) % 4];

        convolution.push(
          (vertex3.x - vertex1.x) * (vertex3.y - vertex2.y) -
            (vertex3.x - vertex2.x) * (vertex3.y - vertex1.y)
        );
      }

      if (
        convolution.every(value => value > 0) ||
        convolution.every(value => value < 0)
      ) {
        result.push(true);
      } else if (convolution.every(value => value === 0)) {
        // result.push(false);
        // // TODO: complete conflict logic here
        for (let i = 0; i < 4; i++) {
          const vertex1 = vertex_array[i];
          const vertex2 = vertex_array[(i + 1) % 4];
          const vertex3 = vertex_array[(i + 2) % 4];

          // let maxX = vertex1.x > vertex2.x ? vertex1.x : vertex2.x;
          // let minX = vertex1.x < vertex2.x ? vertex1.x : vertex2.x;
          // let maxY = vertex1.y > vertex2.y ? vertex1.y : vertex2.y;
          // let minY = vertex1.y < vertex2.y ? vertex1.y : vertex2.y;

          if (
            (vertex3.x - vertex1.x) * (vertex3.y - vertex2.y) -
              (vertex3.x - vertex2.x) * (vertex3.y - vertex1.y) ===
            0
            //   &&
            // ((vertex3.x < maxX && vertex3.x > minX) ||
            //   (vertex3.y < maxY && vertex3.y > minY))
          ) {
            result.push(true);
            break;
          }
        }
      } else {
        result.push(false);
      }
    }
    return result.some(bool => bool === true);
  }

  selfConflicting(prevVertex, newVertex, nextVertex) {
    return false;

    // TODO: self conflicting logic here
  }

  selectedEdge(x, y) {
    let result = {};

    for (let i = 0; i < this.FullVertex.length; i++) {
      if (i === this.FullVertex.length - 1) continue;
      let vertex1 = this.FullVertex[i];
      let vertex2 = this.FullVertex[i + 1];
      // (x3-x1) * (y3-y2) - (x3-x2) * (y3-y1) === 0
      let maxX = vertex1.x > vertex2.x ? vertex1.x : vertex2.x;
      let minX = vertex1.x < vertex2.x ? vertex1.x : vertex2.x;
      let maxY = vertex1.y > vertex2.y ? vertex1.y : vertex2.y;
      let minY = vertex1.y < vertex2.y ? vertex1.y : vertex2.y;

      if (
        (x - vertex1.x) * (y - vertex2.y) - (x - vertex2.x) * (y - vertex1.y) >=
          -1200 &&
        (x - vertex1.x) * (y - vertex2.y) - (x - vertex2.x) * (y - vertex1.y) <=
          1200 &&
        ((x < maxX && x > minX) || (y < maxY && y > minY))
      ) {
        this.index = i;
        return [vertex1, vertex2];
      }
    }
  }

  // Drawing related

  drawVertex() {
    const width = 500;
    const height = 500;
    this.ctx.lineWidth = 4;

    for (let x = 50; x <= width; x += 100) {
      for (let y = 50; y <= height; y += 100) {
        if (this.isStartingVertexPos(x, y)) {
          let vertex = new VertexFull({ ctx: this.ctx, x, y });
          vertex.draw();
        } else {
          let vertex = new VertexEmpty({ ctx: this.ctx, x, y });
          vertex.draw();
        }
      }
    }
  }

  drawlines() {
    for (let i = 0; i < this.FullVertex.length; i++) {
      if (i === this.FullVertex.length - 1) continue;
      if (i === this.index) continue;

      let vertex1 = this.FullVertex[i];
      let vertex2 = this.FullVertex[i + 1];

      let edge = new Edge({
        vertex1,
        vertex2,
        ctx: this.ctx
      });

      edge.draw();
    }
  }

  isStartingVertexPos(x, y) {
    for (let i = 0; i < this.FullVertex.length; i++) {
      let currentVertex = this.FullVertex[i];
      if (x === currentVertex.x && y === currentVertex.y) return true;
    }
    return false;
  }

  initializeStartingVertex() {
    const vertex1 = new VertexFull({
      x: this.startingVertexPos[0][0],
      y: this.startingVertexPos[0][1],
      ctx: this.ctx
    });
    const vertex2 = new VertexFull({
      x: this.startingVertexPos[1][0],
      y: this.startingVertexPos[1][1],
      ctx: this.ctx
    });

    return [vertex1, vertex2];
  }

  populateVertex() {
    const result = [];
    for (let x = 50; x <= 500; x += 100) {
      for (let y = 50; y <= 500; y += 100) {
        result.push([x, y]);
      }
    }
    return result;
  }
}

module.exports = GameView;
