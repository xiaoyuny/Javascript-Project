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

  equals(edge) {
    return (
      (this.vertex1.equalYes(edge.vertex1) &&
        this.vertex2.equalYes(edge.vertex2)) ||
      (this.vertex2.equalYes(edge.vertex1) &&
        this.vertex1.equalYes(edge.vertex2))
    );
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

const Edge = __webpack_require__(/*! ./edge */ "./lib/edge.js");
const Vertex = __webpack_require__(/*! ./vertex */ "./lib/vertex.js");
const GameView = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");
const Level = __webpack_require__(/*! ./level */ "./lib/level.js");

class Game {
  constructor(gameCtx, levelCtx) {
    this.stage = 1;
    this.gameCtx = gameCtx;
    this.levelCtx = levelCtx;
    this.stageClearBind = this.handleStageClear.bind(this);
    this.buildGraph();
    this.enableUndoLastMove();
    this.enableNextLevel();
    this.enableCheckWinning();
  }

  levelCleared() {
    let playerEdges = [];
    for (let i = 0; i < this.gameView.fullVertex.length - 1; i++) {
      const values = [
        this.gameView.fullVertex[i],
        this.gameView.fullVertex[i + 1]
      ].map(vertex => [(vertex.x - 45) / 90, (vertex.y - 45) / 90]);

      playerEdges = playerEdges.concat(
        this.edgeBreakdown(...values[0], ...values[1])
      );
    }

    let computerEdges = [];
    for (let i = 0; i < this.level.goal.length; i++) {
      computerEdges = computerEdges.concat(
        this.edgeBreakdown(...this.level.goal[i][0], ...this.level.goal[i][1])
      );
    }

    if (playerEdges.length != computerEdges.length) {
      return;
    }

    for (let i = 0; i < computerEdges.length; i++) {
      let found = playerEdges.reduce(
        (acc, el) => acc || el.equals(computerEdges[i]),
        false
      );
      if (!found) {
        return;
      }
    }

    this.renderModal();
  }

  edgeBreakdown(x0, y0, x1, y1) {
    const result = [];
    const dx = x1 - x0;
    const dy = y1 - y0;

    for (let j = 4; j >= 1; j--) {
      if (dx % j == 0 && dy % j == 0) {
        for (let k = 0; k < j; k++) {
          result.push(
            new Edge({
              vertex1: new Vertex({
                x: x0 + k * (dx / j),
                y: y0 + k * (dy / j)
              }),
              vertex2: new Vertex({
                x: x0 + (k + 1) * (dx / j),
                y: y0 + (k + 1) * (dy / j)
              })
            })
          );
        }
        return result;
      }
    }
  }

  // helper

  renderModal() {
    const messageUl = document.getElementById('message');
    messageUl.className = '';
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');

    if (this.stage < 12) {
      li1.appendChild(document.createTextNode(`Level ${this.stage} cleared!`));
      li2.appendChild(document.createTextNode('NEXT'));
      messageUl.appendChild(li1);
      messageUl.appendChild(li2);

      li2.addEventListener('click', e => {
        this.handleStageClear();
        setTimeout(() => {
          messageUl.className = 'display-none';
          messageUl.removeChild(li1);
          messageUl.removeChild(li2);
        }, 200);
      });
    } else {
      li1.appendChild(
        document.createTextNode("Congradulations! You've cleared all levels!")
      );
      li2.appendChild(document.createTextNode('PLAY AGAIN'));
      messageUl.appendChild(li1);
      messageUl.appendChild(li2);
      li2.addEventListener('click', e => {
        this.handleResetGame();
        setTimeout(() => {
          messageUl.className = 'display-none';
          messageUl.removeChild(li1);
          messageUl.removeChild(li2);
          this.enableNextLevel();
        }, 200);
      });
    }
  }

  handleStageClear() {
    this.stage += 1;

    if (this.stage === 12) {
      const nextLevel = document.getElementById('next-level');
      nextLevel.removeEventListener('click', this.stageClearBind);
      this.renderModal();
    }

    this.gameView.ctx.clearRect(0, 0, 450, 450);
    this.level.ctx.clearRect(0, 0, 216, 216);
    this.buildGraph();
  }

  handleResetGame() {
    this.stage = 1;
    this.gameView.ctx.clearRect(0, 0, 450, 450);
    this.level.ctx.clearRect(0, 0, 216, 216);
    this.buildGraph();
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

  enableNextLevel() {
    const nextLevel = document.getElementById('next-level');
    nextLevel.addEventListener('click', this.stageClearBind);
  }

  enableCheckWinning() {
    const gameCanvas = document.getElementById('game-canvas');
    gameCanvas.addEventListener('mouseup', e =>
      setTimeout(this.levelCleared.bind(this), 250)
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
      ((x < maxX && x > minX) || (y < maxY && y > minY)) &&
      (x - edgeVertex1.x) * (y - edgeVertex2.y) -
        (x - edgeVertex2.x) * (y - edgeVertex1.y) !==
        0
    ); //&&
    // !(x < maxX && x > minX && y < maxY && y > minY)
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

    this.draw();
  }

  draw() {
    this.drawVertex();
    for (let i = 0; i < this.goal.length; i++) {
      const vertexPos1 = this.goal[i][0];
      const vertexPos2 = this.goal[i][1];
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
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1;
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
    1: [[1, 3], [3, 3]],
    2: [[1, 2], [2, 1], [3, 2], [1, 2], [2, 3], [3, 2]],
    3: [[2, 2], [1, 0], [3, 0], [2, 2], [1, 4], [3, 4], [2, 2]],
    4: [[1, 1], [3, 1], [3, 3], [1, 3], [1, 1]],
    5: [[1, 1], [3, 1], [3, 3], [1, 3], [1, 1]],
    6: [[1, 2], [1, 1], [2, 1], [2, 3], [3, 3], [3, 2]],
    7: [[1, 1], [2, 1], [2, 2], [3, 2], [3, 3], [2, 3], [2, 2], [1, 2], [1, 1]],
    8: [[2, 1], [1, 3], [3, 3], [2, 1]],
    9: [[1, 2], [3, 2]],
    10: [[0, 0], [4, 0], [4, 4], [0, 4], [0, 0]],
    11: [[2, 1], [3, 3], [1, 3], [2, 1]],
    12: [[1, 2], [3, 2]]
  },
  goal: {
    1: [
      [[1, 3], [1, 2]],
      [[1, 2], [1, 1]],
      [[1, 1], [2, 3]],
      [[2, 3], [3, 1]],
      [[3, 1], [3, 2]],
      [[3, 2], [3, 3]]
    ],
    2: [
      [[1, 2], [0, 1]],
      [[0, 1], [1, 1]],
      [[1, 1], [2, 1]],
      [[2, 1], [3, 1]],
      [[3, 1], [4, 1]],
      [[4, 1], [3, 2]],
      [[3, 2], [2, 3]],
      [[2, 3], [1, 2]],
      [[1, 2], [2, 2]],
      [[2, 2], [3, 2]]
    ],
    3: [
      [[2, 2], [1, 2]],
      [[1, 2], [0, 2]],
      [[0, 2], [1, 0]],
      [[1, 0], [2, 0]],
      [[2, 0], [3, 0]],
      [[3, 0], [4, 2]],
      [[4, 2], [3, 2]],
      [[3, 2], [2, 2]],
      [[2, 2], [3, 4]],
      [[3, 4], [2, 3]],
      [[2, 3], [1, 4]],
      [[1, 4], [2, 2]]
    ],
    4: [
      [[1, 1], [1, 0]],
      [[1, 0], [2, 0]],
      [[2, 0], [3, 0]],
      [[3, 0], [3, 1]],
      [[3, 1], [3, 2]],
      [[3, 2], [2, 2]],
      [[2, 2], [1, 2]],
      [[1, 2], [1, 1]],
      [[2, 2], [4, 3]],
      [[4, 3], [3, 3]],
      [[3, 3], [3, 4]],
      [[3, 4], [2, 4]],
      [[2, 4], [1, 4]],
      [[1, 4], [1, 3]],
      [[1, 3], [0, 3]],
      [[0, 3], [2, 2]]
    ],
    5: [
      [[1, 1], [0, 2]],
      [[0, 2], [1, 3]],
      [[1, 3], [2, 2]],
      [[2, 2], [3, 3]],
      [[3, 3], [4, 2]],
      [[4, 2], [3, 1]],
      [[3, 1], [2, 2]],
      [[2, 2], [1, 1]]
    ],
    6: [
      [[1, 2], [1, 1]],
      [[1, 1], [2, 1]],
      [[2, 1], [3, 2]],
      [[3, 2], [3, 3]],
      [[3, 3], [2, 3]],
      [[2, 3], [1, 2]],
      [[1, 2], [2, 2]],
      [[2, 2], [3, 2]]
    ],
    7: [
      [[1, 1], [2, 1]],
      [[2, 1], [2, 2]],
      [[2, 2], [1, 1]],
      [[2, 2], [3, 1]],
      [[3, 1], [3, 2]],
      [[3, 2], [2, 2]],
      [[2, 2], [3, 3]],
      [[3, 3], [2, 3]],
      [[2, 3], [2, 2]],
      [[2, 2], [1, 2]],
      [[1, 2], [1, 3]],
      [[1, 3], [2, 2]]
    ],
    8: [
      [[2, 1], [3, 1]],
      [[3, 1], [2, 0]],
      [[2, 0], [1, 1]],
      [[1, 1], [2, 1]],
      [[2, 1], [3, 3]],
      [[3, 3], [3, 4]],
      [[3, 4], [2, 1]],
      [[2, 1], [1, 4]],
      [[1, 4], [1, 3]],
      [[1, 3], [2, 1]]
    ],
    9: [
      [[1, 2], [2, 2]],
      [[2, 2], [3, 2]],
      [[2, 2], [3, 4]],
      [[3, 4], [4, 4]],
      [[4, 4], [3, 1]],
      [[3, 1], [2, 1]],
      [[2, 1], [1, 1]],
      [[1, 1], [0, 4]],
      [[0, 4], [1, 4]],
      [[1, 4], [2, 2]]
    ],
    10: [
      [[0, 0], [0, 4]],
      [[0, 0], [4, 0]],
      [[4, 0], [4, 4]],
      [[4, 4], [0, 4]],
      [[0, 2], [2, 2]],
      [[2, 2], [4, 2]],
      [[2, 2], [2, 0]],
      [[2, 2], [2, 4]],
      [[0, 2], [1, 3]],
      [[1, 3], [2, 2]],
      [[2, 2], [1, 1]],
      [[1, 1], [2, 0]],
      [[2, 2], [3, 1]],
      [[3, 1], [4, 2]],
      [[2, 2], [3, 3]],
      [[3, 3], [2, 4]]
    ],
    11: [
      [[2, 0], [3, 0]],
      [[3, 0], [3, 1]],
      [[3, 1], [2, 1]],
      [[2, 1], [2, 0]],
      [[3, 1], [4, 1]],
      [[4, 1], [4, 2]],
      [[4, 2], [3, 2]],
      [[3, 2], [3, 1]],
      [[3, 2], [2, 2]],
      [[2, 2], [2, 1]],
      [[2, 1], [1, 1]],
      [[1, 1], [1, 2]],
      [[1, 2], [2, 2]],
      [[3, 2], [3, 3]],
      [[3, 3], [2, 3]],
      [[2, 3], [2, 2]],
      [[2, 3], [1, 3]],
      [[1, 3], [1, 2]],
      [[1, 3], [0, 3]],
      [[0, 3], [0, 2]],
      [[0, 2], [1, 2]],
      [[1, 3], [1, 4]],
      [[1, 4], [2, 4]],
      [[2, 4], [2, 3]]
    ],
    12: [
      [[0, 0], [1, 1]],
      [[1, 1], [0, 1]],
      [[0, 1], [0, 0]],
      [[1, 1], [2, 2]],
      [[2, 2], [1, 2]],
      [[1, 2], [1, 1]],
      [[1, 2], [0, 2]],
      [[0, 2], [0, 1]],
      [[0, 1], [1, 2]],
      [[0, 2], [0, 3]],
      [[0, 2], [1, 3]],
      [[1, 3], [0, 3]],
      [[1, 2], [1, 3]],
      [[1, 3], [2, 3]],
      [[2, 3], [3, 3]],
      [[3, 3], [3, 2]],
      [[3, 2], [2, 2]],
      [[2, 2], [1, 3]],
      [[2, 2], [3, 3]],
      [[0, 3], [0, 4]],
      [[0, 4], [1, 4]],
      [[1, 4], [0, 3]],
      [[1, 4], [2, 3]],
      [[1, 3], [1, 4]],
      [[2, 3], [3, 4]],
      [[3, 4], [3, 3]],
      [[3, 4], [4, 3]],
      [[4, 4], [3, 4]],
      [[4, 4], [4, 3]],
      [[4, 3], [3, 3]],
      [[4, 3], [4, 2]],
      [[4, 2], [3, 2]],
      [[4, 2], [3, 3]],
      [[4, 2], [4, 1]],
      [[4, 1], [3, 1]],
      [[3, 1], [3, 2]],
      [[3, 2], [4, 1]],
      [[2, 2], [3, 1]],
      [[4, 1], [4, 0]],
      [[3, 1], [4, 0]]
    ]
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

  equalYes(vertex) {
    return this.x === vertex.x && this.y === vertex.y;
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