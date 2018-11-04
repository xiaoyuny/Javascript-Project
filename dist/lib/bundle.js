/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/line-weaver.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/edge.js":
/*!*********************!*\
  !*** ./lib/edge.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Constants = __webpack_require__(/*! ./util/constants */ "./lib/util/constants.js");

class Edge {
  constructor(options) {
    this.vertex1 = options.vertex1;
    this.vertex2 = options.vertex2;
    this.ctx = options.ctx;
  }

  draw() {
    this.ctx.strokeStyle = Constants.VALID_EDGE_YELLOW;
    this.ctx.shadowColor = Constants.VALID_EDGE_YELLOW;
    this.ctx.lineWidth = 12;
    this.ctx.shadowBlur = 5;
    this.ctx.globalAlpha = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.vertex1.x, this.vertex1.y);
    this.ctx.lineTo(this.vertex2.x, this.vertex2.y);
    this.ctx.stroke();
  }
}

module.exports = Edge;


/***/ }),

/***/ "./lib/edge_overlapping.js":
/*!*********************************!*\
  !*** ./lib/edge_overlapping.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Edge = __webpack_require__(/*! ./edge */ "./lib/edge.js");
const Constants = __webpack_require__(/*! ./util/constants */ "./lib/util/constants.js");

class EdgeOverlapping extends Edge {
  constructor(options) {
    super(options);
  }

  draw() {
    this.ctx.strokeStyle = Constants.OVERLAPPING_EDGE_RED;
    this.ctx.shadowColor = Constants.OVERLAPPING_EDGE_RED;
    this.ctx.lineWidth = 12;
    this.ctx.shadowBlur = 5;
    this.ctx.globalAlpha = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.vertex1.x, this.vertex1.y);
    this.ctx.lineTo(this.vertex2.x, this.vertex2.y);
    this.ctx.stroke();

    this.drawX();
  }

  drawX() {
    this.ctx.beginPath();

    this.ctx.moveTo(
      (this.vertex1.x + this.vertex2.x) / 2 - 15,
      (this.vertex1.y + this.vertex2.y) / 2 - 15
    );
    this.ctx.lineTo(
      (this.vertex1.x + this.vertex2.x) / 2 + 15,
      (this.vertex1.y + this.vertex2.y) / 2 + 15
    );

    this.ctx.moveTo(
      (this.vertex1.x + this.vertex2.x) / 2 + 15,
      (this.vertex1.y + this.vertex2.y) / 2 - 15
    );
    this.ctx.lineTo(
      (this.vertex1.x + this.vertex2.x) / 2 - 15,
      (this.vertex1.y + this.vertex2.y) / 2 + 15
    );
    this.ctx.lineWidth = 7;
    this.ctx.strokeStyle = 'white';

    this.ctx.stroke();
  }
}

module.exports = EdgeOverlapping;


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");
const Level = __webpack_require__(/*! ./level */ "./lib/level.js");

class Game {
  constructor(gameCtx, levelCtx) {
    this.stage = 1;
    this.gameCtx = gameCtx;
    this.levelCtx = levelCtx;
    this.buildGraph();
    this.enableUndoLastMove();
    this.enableRestart();
    this.enableCheckWinning();
  }

  levelCleared() {
    const player = this.gameView.fullVertex
      .map(el => [el.x, el.y])
      .map(el => el.map(num => (num - 45) / 90));

    if (player.length !== this.level.goal.length) return false;
    for (let i = 0; i < player.length; i++) {
      if (
        player[i][0] !== this.level.goal[i][0] ||
        player[i][1] !== this.level.goal[i][1]
      ) {
        return false;
      }
    }

    const para = document.createElement('p');
    const node = document.createTextNode('LEVEL CLEARED');
    para.appendChild(node);

    const el = document.getElementById('message');
    el.appendChild(para);

    console.log('cleared');
    return true;
  }

  buildGraph() {
    this.gameView = new GameView(this.gameCtx, this.stage);
    this.level = new Level(this.levelCtx, this.stage);
  }

  enableUndoLastMove() {
    const undo = document.getElementById('undo');
    undo.addEventListener('click', this.handleUndo.bind(this));
  }

  enableRestart() {
    const restart = document.getElementById('restart');
    restart.addEventListener('click', this.handleRestart.bind(this));
  }

  enableCheckWinning() {
    const gameCanvas = document.getElementById('game-canvas');
    gameCanvas.addEventListener('mouseup', e =>
      setTimeout(this.levelCleared.bind(this), 500)
    );
  }

  handleUndo() {
    if (this.gameView.moveOrder.length > 0) {
      this.gameView.fullVertex = this.gameView.fullVertex
        .slice(
          0,
          this.gameView.moveOrder[this.gameView.moveOrder.length - 1] + 1
        )
        .concat(
          this.gameView.fullVertex.slice(
            this.gameView.moveOrder[this.gameView.moveOrder.length - 1] + 2
          )
        );
      this.gameView.moveOrder.pop();
      this.gameView.ctx.clearRect(0, 0, 450, 450);
      this.gameView.drawVertex();
      this.gameView.drawlines();
    }
  }

  handleRestart() {
    this.gameView.fullVertex = this.gameView.initializeStartingVertex();
    this.gameView.ctx.clearRect(0, 0, 450, 450);
    this.gameView.drawVertex();
    this.gameView.drawlines();
  }
}

module.exports = Game;


/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const VertexFull = __webpack_require__(/*! ./vertex_full */ "./lib/vertex_full.js");
const VertexEmpty = __webpack_require__(/*! ./vertex_empty */ "./lib/vertex_empty.js");
const VertexTemp = __webpack_require__(/*! ./vertex_temp */ "./lib/vertex_temp.js");
const Edge = __webpack_require__(/*! ./edge */ "./lib/edge.js");
const EdgeOverlapping = __webpack_require__(/*! ./edge_overlapping */ "./lib/edge_overlapping.js");
const Stats = __webpack_require__(/*! ./util/stats */ "./lib/util/stats.js");

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
    for (let i = 0; i < this.fullVertex.length; i++) {
      if (i === this.fullVertex.length - 1) continue;
      if (i === this.index) continue;
      const boardVertex1 = this.fullVertex[i];
      const boardVertex2 = this.fullVertex[i + 1];

      const vertexArray = [
        edgeVertex1,
        boardVertex1,
        edgeVertex2,
        boardVertex2
      ];
      const convolution = [];

      for (let i = 0; i < 4; i++) {
        const vertex1 = vertexArray[i];
        const vertex2 = vertexArray[(i + 1) % 4];
        const vertex3 = vertexArray[(i + 2) % 4];

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
        return (
          this.hasConflictsSpecialCase(
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

  hasConflictsSpecialCase(
    edgeVertex1,
    edgeVertex2,
    boardVertex1,
    boardVertex2
  ) {
    if (this.samePos(edgeVertex1, boardVertex1)) {
      return this.samePos(edgeVertex2, boardVertex2);
    }

    if (this.samePos(edgeVertex1, boardVertex2)) {
      return this.samePos(edgeVertex2, boardVertex1);
    }

    return (
      this.samePos(edgeVertex1, boardVertex1) ||
      this.samePos(edgeVertex1, boardVertex2) ||
      this.samePos(edgeVertex2, boardVertex1) ||
      this.samePos(edgeVertex2, boardVertex2)
    );
  }

  samePos(vertex1, vertex2) {
    return vertex1.x === vertex2.x && vertex1.y === vertex2.y;
  }

  isVertexOnEdge(edgeVertex1, edgeVertex2, vertex) {
    const x = vertex.x;
    const y = vertex.y;
    // (x3-x1) * (y3-y2) - (x3-x2) * (y3-y1) === 0
    let maxX = edgeVertex1.x > edgeVertex2.x ? edgeVertex1.x : edgeVertex2.x;
    let minX = edgeVertex1.x < edgeVertex2.x ? edgeVertex1.x : edgeVertex2.x;
    let maxY = edgeVertex1.y > edgeVertex2.y ? edgeVertex1.y : edgeVertex2.y;
    let minY = edgeVertex1.y < edgeVertex2.y ? edgeVertex1.y : edgeVertex2.y;

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

  selectedEdge(x, y) {
    let result = {};

    for (let i = 0; i < this.fullVertex.length; i++) {
      if (i === this.fullVertex.length - 1) continue;
      let vertex1 = this.fullVertex[i];
      let vertex2 = this.fullVertex[i + 1];
      // (x3-x1) * (y3-y2) - (x3-x2) * (y3-y1) === 0
      let maxX = vertex1.x > vertex2.x ? vertex1.x : vertex2.x;
      let minX = vertex1.x < vertex2.x ? vertex1.x : vertex2.x;
      let maxY = vertex1.y > vertex2.y ? vertex1.y : vertex2.y;
      let minY = vertex1.y < vertex2.y ? vertex1.y : vertex2.y;

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

  // Drawing related

  // redraw(target) {

  // }

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


/***/ }),

/***/ "./lib/level.js":
/*!**********************!*\
  !*** ./lib/level.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Stats = __webpack_require__(/*! ./util/stats */ "./lib/util/stats.js");
const Constants = __webpack_require__(/*! ./util/constants */ "./lib/util/constants.js");

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


/***/ }),

/***/ "./lib/line-weaver.js":
/*!****************************!*\
  !*** ./lib/line-weaver.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./lib/game.js");
const GameView = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");
const Level = __webpack_require__(/*! ./level */ "./lib/level.js");

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');
  gameCanvas.width = 450;
  gameCanvas.height = 450;

  const levelCanvas = document.getElementById('level-canvas');
  levelCanvas.width = 230;
  levelCanvas.height = 230;

  const gameCtx = gameCanvas.getContext('2d');
  const levelCtx = levelCanvas.getContext('2d');

  const game = new Game(gameCtx, levelCtx);
});


/***/ }),

/***/ "./lib/util/constants.js":
/*!*******************************!*\
  !*** ./lib/util/constants.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  VERTEX_PINK: '#F37A90',
  OVERLAPPING_EDGE_RED: '#FF0000',
  VALID_EDGE_YELLOW: '#e4cd00'
};


/***/ }),

/***/ "./lib/util/stats.js":
/*!***************************!*\
  !*** ./lib/util/stats.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  game: {
    1: [[1, 2], [3, 2]]
  },
  goal: {
    1: [[1, 2], [2, 1], [3, 2]]
  }
};


/***/ }),

/***/ "./lib/vertex.js":
/*!***********************!*\
  !*** ./lib/vertex.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Vertex {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.ctx = options.ctx;
  }

  pos() {
    return [this.x, this.y];
  }
}

module.exports = Vertex;


/***/ }),

/***/ "./lib/vertex_empty.js":
/*!*****************************!*\
  !*** ./lib/vertex_empty.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Vertex = __webpack_require__(/*! ./vertex */ "./lib/vertex.js");
const Constants = __webpack_require__(/*! ./util/constants */ "./lib/util/constants.js");

class VertexEmpty extends Vertex {
  constructor(options) {
    super(options);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = Constants.VERTEX_PINK;
    this.ctx.strokeStyle = Constants.VERTEX_PINK;
    this.ctx.lineWidth = 5;
    this.ctx.shadowBlur = 0;
    this.ctx.globalAlpha = 1;
    this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

module.exports = VertexEmpty;


/***/ }),

/***/ "./lib/vertex_full.js":
/*!****************************!*\
  !*** ./lib/vertex_full.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Vertex = __webpack_require__(/*! ./vertex */ "./lib/vertex.js");
const Constants = __webpack_require__(/*! ./util/constants */ "./lib/util/constants.js");

class VertexFull extends Vertex {
  constructor(options) {
    super(options);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
    this.ctx.fillStyle = Constants.VERTEX_PINK;
    this.ctx.strokeStyle = Constants.VERTEX_PINK;
    this.ctx.lineWidth = 5;
    this.ctx.globalAlpha = 1;
    this.ctx.fill();
    this.ctx.beginPath();

    this.ctx.moveTo(this.x - 7, this.y - 7);
    this.ctx.lineTo(this.x + 7, this.y + 7);

    this.ctx.moveTo(this.x + 7, this.y - 7);
    this.ctx.lineTo(this.x - 7, this.y + 7);
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }
}

module.exports = VertexFull;


/***/ }),

/***/ "./lib/vertex_temp.js":
/*!****************************!*\
  !*** ./lib/vertex_temp.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Vertex = __webpack_require__(/*! ./vertex */ "./lib/vertex.js");

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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map