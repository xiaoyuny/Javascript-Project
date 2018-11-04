const VertexFull = require('./vertex_full');
const VertexEmpty = require('./vertex_empty');
const VertexTemp = require('./vertex_temp');
const Edge = require('./edge');
const EdgeOverlapping = require('./edge_overlapping');
const Stats = require('./util/stats');

class GameView {
  constructor(ctx, stage) {
    this.ctx = ctx;
    this.stage = stage;
    this.startingVertexPos = this.calculateStartPos();
    this.fullVertex = this.initializeStartingVertex();
    this.allVertexPos = this.populateVertex();
    this.moveOrder = [];
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
        pos[0] <= e.offsetX + 20 &&
        pos[0] >= e.offsetX - 20 &&
        pos[1] <= e.offsetY + 20 &&
        pos[1] >= e.offsetY - 20
      ) {
        const newVertex = new VertexFull({
          x: pos[0],
          y: pos[1],
          ctx: this.ctx
        });

        const prevVertex = this.fullVertex[this.index];
        const nextVertex = this.fullVertex[this.index + 1];

        if (
          this.hasConflicts(prevVertex, newVertex) ||
          this.hasConflicts(nextVertex, newVertex) ||
          this.selfConflicting(this.selected[0], newVertex, this.selected[1])
        ) {
          break;
        } else {
          this.fullVertex = this.fullVertex
            .slice(0, this.index + 1)
            .concat([newVertex])
            .concat(this.fullVertex.slice(this.index + 1));

          this.moveOrder.push(this.index);
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

    if (
      this.hasConflicts(this.selected[0], newVertex) ||
      this.selfConflicting(this.selected[0], newVertex, this.selected[1])
    ) {
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

    if (
      this.hasConflicts(this.selected[1], newVertex) ||
      this.selfConflicting(this.selected[0], newVertex, this.selected[1])
    ) {
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
    this.ctx.clearRect(0, 0, 450, 450);

    this.drawVertex();
    this.drawlines();
    newVertex.draw();
    edge1.draw();
    edge2.draw();
  }

  // helpers

  hasConflicts(edgeVertex1, edgeVertex2) {
    const result = [];
    for (let i = 0; i < this.fullVertex.length - 1; i++) {
      if (i === this.index) continue;
      const boardVertex1 = this.fullVertex[i];
      const boardVertex2 = this.fullVertex[i + 1];

      const vertexArray = [
        edgeVertex1,
        boardVertex1,
        edgeVertex2,
        boardVertex2
      ];
      const crossProduct = [];

      for (let i = 0; i < 4; i++) {
        const vertex1 = vertexArray[i];
        const vertex2 = vertexArray[(i + 1) % 4];
        const vertex3 = vertexArray[(i + 2) % 4];

        crossProduct.push(
          (vertex3.x - vertex1.x) * (vertex3.y - vertex2.y) -
            (vertex3.x - vertex2.x) * (vertex3.y - vertex1.y)
        );
      }

      if (
        crossProduct.every(value => value > 0) ||
        crossProduct.every(value => value < 0)
      ) {
        result.push(true);
      } else if (crossProduct.every(value => value === 0)) {
        return (
          this.isSameEdge(
            edgeVertex1,
            edgeVertex2,
            boardVertex1,
            boardVertex2
          ) ||
          (this.isVertexOnEdge(edgeVertex1, edgeVertex2, boardVertex1) ||
            this.isVertexOnEdge(edgeVertex1, edgeVertex2, boardVertex2) ||
            this.isVertexOnEdge(boardVertex1, boardVertex2, edgeVertex1) ||
            this.isVertexOnEdge(boardVertex1, boardVertex2, edgeVertex2))
        );
      } else {
        result.push(false);
      }
    }
    return result.some(bool => bool === true);
  }

  selfConflicting(prevVertex, newVertex, nextVertex) {
    const isEdgeConflicting1 = this.isVertexOnEdge(
      prevVertex,
      newVertex,
      nextVertex
    );
    const isEdgeConflicting2 = this.isVertexOnEdge(
      nextVertex,
      newVertex,
      prevVertex
    );

    return isEdgeConflicting1 || isEdgeConflicting2;
  }

  isVertexOnEdge(edgeVertex1, edgeVertex2, vertex) {
    const x = vertex.x;
    const y = vertex.y;

    const maxX = edgeVertex1.x > edgeVertex2.x ? edgeVertex1.x : edgeVertex2.x;
    const minX = edgeVertex1.x < edgeVertex2.x ? edgeVertex1.x : edgeVertex2.x;
    const maxY = edgeVertex1.y > edgeVertex2.y ? edgeVertex1.y : edgeVertex2.y;
    const minY = edgeVertex1.y < edgeVertex2.y ? edgeVertex1.y : edgeVertex2.y;

    return (
      (x - edgeVertex1.x) * (y - edgeVertex2.y) -
        (x - edgeVertex2.x) * (y - edgeVertex1.y) >=
        -5000 &&
      (x - edgeVertex1.x) * (y - edgeVertex2.y) -
        (x - edgeVertex2.x) * (y - edgeVertex1.y) <=
        5000 &&
      ((x < maxX && x > minX) || (y < maxY && y > minY))
    );
  }

  isVertexExactlyOnEdge(edgeVertex1, edgeVertex2, vertex) {
    const x = vertex.x;
    const y = vertex.y;

    return (
      (x - edgeVertex1.x) * (y - edgeVertex2.y) ==
      (x - edgeVertex2.x) * (y - edgeVertex1.y)
    );
  }

  selectedEdge(x, y) {
    for (let i = 0; i < this.fullVertex.length; i++) {
      if (i === this.fullVertex.length - 1) continue;
      const vertex1 = this.fullVertex[i];
      const vertex2 = this.fullVertex[i + 1];

      const maxX = vertex1.x > vertex2.x ? vertex1.x : vertex2.x;
      const minX = vertex1.x < vertex2.x ? vertex1.x : vertex2.x;
      const maxY = vertex1.y > vertex2.y ? vertex1.y : vertex2.y;
      const minY = vertex1.y < vertex2.y ? vertex1.y : vertex2.y;

      if (
        (x - vertex1.x) * (y - vertex2.y) - (x - vertex2.x) * (y - vertex1.y) >=
          -2000 &&
        (x - vertex1.x) * (y - vertex2.y) - (x - vertex2.x) * (y - vertex1.y) <=
          2000 &&
        ((x < maxX && x > minX) || (y < maxY && y > minY))
      ) {
        this.index = i;
        return [vertex1, vertex2];
      }
    }
  }

  isSameEdge(edgeVertex1, edgeVertex2, boardVertex1, boardVertex2) {
    (this.isSamePos(edgeVertex1, boardVertex1) &&
      this.isSamePos(edgeVertex2, boardVertex2)) ||
      (this.isSamePos(edgeVertex1, boardVertex2) &&
        this.isSamePos(edgeVertex2, boardVertex1));
  }

  isSamePos(vertex1, vertex2) {
    return vertex1.x === vertex2.x && vertex1.y === vertex2.y;
  }

  // Drawing related

  drawVertex() {
    const width = 450;
    const height = 450;
    this.ctx.lineWidth = 4;

    for (let x = 45; x <= width; x += 90) {
      for (let y = 45; y <= height; y += 90) {
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
    for (let i = 0; i < this.fullVertex.length; i++) {
      if (i === this.fullVertex.length - 1) continue;
      if (i === this.index) continue;
      let vertex1 = this.fullVertex[i];
      let vertex2 = this.fullVertex[i + 1];

      let edge = new Edge({
        vertex1,
        vertex2,
        ctx: this.ctx
      });

      edge.draw();
    }
  }

  isStartingVertexPos(x, y) {
    for (let i = 0; i < this.fullVertex.length; i++) {
      let currentVertex = this.fullVertex[i];
      if (x === currentVertex.x && y === currentVertex.y) return true;
    }
    return false;
  }

  initializeStartingVertex() {
    return this.startingVertexPos.map(
      pos =>
        new VertexFull({
          x: pos[0],
          y: pos[1],
          ctx: this.ctx
        })
    );
  }

  populateVertex() {
    const result = [];
    for (let x = 45; x <= 450; x += 90) {
      for (let y = 45; y <= 450; y += 90) {
        result.push([x, y]);
      }
    }
    return result;
  }

  calculateStartPos() {
    return Stats.game[this.stage].map(el => el.map(num => 45 + num * 90));
  }
}

module.exports = GameView;
