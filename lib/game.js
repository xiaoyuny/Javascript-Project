const GameView = require('./game_view');

class Game {
  constructor(gameView) {
    this.gameView = gameView;
    this.level = 0;
    this.enableUndoLastMove();
  }

  levelCleared() {}

  buildGraph() {}

  enableUndoLastMove() {
    const undo = document.getElementById('undo');
    undo.addEventListener('click', this.handleUndo.bind(this));
  }

  enableRestart() {
    const restart = document.getElementById('restart');
    undo.addEventListener('click', this.handleRestart.bind(this));
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

  handleRestart() {}
}

module.exports = Game;
