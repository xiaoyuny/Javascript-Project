const Constants = require('./util/constants');
const Knot = require('./knot');
const KnotFull = require('./knot_full');
const KnotEmpty = require('./knot_empty');

class GameView {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.level = 0;
    this.startingKnots = [[50, 150], [50, 250]];

    this.fullKnots = [];
    this.drawKnots(ctx);

    this.enableCreateKnots();
  }

  drawKnots(ctx) {
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
          this.fullKnots.push(knot);
          knot.draw();
        } else {
          new KnotEmpty({ ctx, x, y }).draw();
        }
      }
    }
  }

  isStartingKnotPos(x, y) {
    for (let i = 0; i < this.startingKnots.length; i++) {
      let currentKnot = this.startingKnots[i];
      if (x === currentKnot[0] && y === currentKnot[1]) return true;
    }
    return false;
  }

  enableCreateKnots() {
    const gameCanvas = document.getElementById('game-canvas');
    gameCanvas.addEventListener('mousedown', e => {
      console.log(e.offsetX, e.offsetY);
      let knot = new KnotFull({ x: e.offsetX, y: e.offsetY, ctx: this.ctx });
      debugger;
      knot.draw();
    });
  }
}

module.exports = GameView;
