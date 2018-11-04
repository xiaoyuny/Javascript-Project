const Edge = require('./edge');
const Vertex = require('./vertex');
const GameView = require('./game_view');
const Level = require('./level');

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
    const player = this.gameView.fullVertex
      .map(el => [el.x, el.y])
      .map(el => el.map(num => (num - 45) / 90));

    if (player.length !== this.level.goal.length) return false;
    for (let i = 0; i < player.length; i++) {
      if (
        player[i][0] !== this.level.goal[i][0] ||
        player[i][1] !== this.level.goal[i][1]
      ) {
        return;
      }
    }

    this.renderModal();
  }

  levelCleared2() {
    const playerEdges = [];
    for (let i = 0; i < this.gameView.fullVertex.length - 1; i++) {
      const startVertex = this.gameView.fullVertex[i];
      const endVertex = this.gameView.fullVertex[i + 1];
      const x0 = (startVertex.x - 45) / 90;
      const y0 = (startVertex.y - 45) / 90;
      const x1 = (endVertex.x - 45) / 90;
      const y1 = (endVertex.y - 45) / 90;
      const dx = x1 - x0;
      const dy = y1 - y0;
      for (let j = 4; j >= 1; j--) {
        if (dx % j == 0 && dy % j == 0) {
          for (let k = 0; k < j; k++) {
            playerEdges.push(
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
          break;
        }
      }
    }
    const computerEdges = [];
    for (let i = 0; i < this.level.goal.length; i++) {
      const x0 = this.level.goal[i][0][0];
      const y0 = this.level.goal[i][0][1];
      const x1 = this.level.goal[i][1][0];
      const y1 = this.level.goal[i][1][1];
      const dx = x1 - x0;
      const dy = y1 - y0;
      for (let j = 4; j >= 1; j--) {
        if (dx % j == 0 && dy % j == 0) {
          for (let k = 0; k < j; k++) {
            computerEdges.push(
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
          break;
        }
      }
    }

    if (playerEdges.length != computerEdges.length) {
      return;
    }

    for (let i = 0; i < computerEdges.length; i++) {
      let found = playerEdges.reduce(
        (acc, ele) => acc || ele.equalYes(computerEdges[i]),
        false
      );
      if (!found) {
        return;
      }
    }

    this.renderModal();
  }

  // helper
  isNextVertexOnEdge(edge, vertex) {}

  canEdgesCombine() {}

  combineEdges() {}

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
      setTimeout(this.levelCleared2.bind(this), 250)
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
