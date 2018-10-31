const Constants = require('./util/constants');

class Knot {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.color = Constants.COLOR;
    this.ctx = options.ctx;
  }

  pos() {
    return [this.x, this.y];
  }
}

module.exports = Knot;
