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
