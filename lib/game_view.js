const Constants = require('./util/constants');
const KnotFull = require('./knot_full');
const KnotEmpty = require('./knot_empty');
const Line = require('./line');

class GameView {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.level = 0;
    this.startingKnotsPos = [[50, 150], [50, 250]];

    this.startingKnots = [];
    this.drawStartingKnots(ctx);

    this.enableCreateKnots();
  }

  drawStartingKnots(ctx) {
    const width = 500;
    const height = 500;
    ctx.lineWidth = 4;

    for (let x = 50; x <= width; x += 100) {
      for (let y = 50; y <= height; y += 100) {
        if (this.isStartingKnotPos(x, y)) {
          let knot = new KnotFull({
            ctx,
            x,
            y
          });
          this.startingKnots.push(knot);
          knot.draw();
        } else {
          let knot = new KnotEmpty({ ctx, x, y });
          knot.draw();
        }
      }
    }
  }

  isStartingKnotPos(x, y) {
    for (let i = 0; i < this.startingKnotsPos.length; i++) {
      let currentKnot = this.startingKnotsPos[i];
      if (x === currentKnot[0] && y === currentKnot[1]) return true;
    }
    return false;
  }

  enableCreateKnots() {
    const gameCanvas = document.getElementById('game-canvas');
    gameCanvas.addEventListener('mousedown', e => {
      console.log(e.offsetX, e.offsetY);
      let knot = new KnotFull({
        x: e.offsetX,
        y: e.offsetY,
        ctx: this.ctx
      });
      knot.draw();
    });
  }

  drawStartingLines() {
    this.startingKnots.forEach(knot => {});
  }
}

module.exports = GameView;
