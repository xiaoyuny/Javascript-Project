const GameView = require('./game_view');
const Level = require('./level');

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

    this.renderModal();
    return true;
  }

  renderModal() {
    const messageUl = document.getElementById('message');
    messageUl.className = '';
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');

    if (this.stage < 10) {
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
        }, 200);
      });
    }
  }

  handleStageClear() {
    this.stage += 1;
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
