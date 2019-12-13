const Computer = require('./int');

const id = ([x, y]) => `${x}#${y}`;

class Launcher {
  constructor(instructions, reader, renderer, headless) {
    this.input = [];
    this.output = [];
    this.computer = new Computer(instructions, this.input, this.output);
    this.score = 0;
    this.reading = false;
    this.map = new Map();
    this.ball = [];
    this.ballMovement = [];
    this.paddle = 0;
    this.reader = reader;
    this.renderer = renderer;
    this.headless = headless;
  }

  isFinished() {
    return this.computer.isFinished();
  }

  run() {
    while (!this.computer.isFinished()) {
      if (this.reading && !this.input.length) {
        continue;
      }

      this.computer.run();
      let x = this.output.pop();
      this.computer.run();
      let y = this.output.pop();
      this.computer.run();
      let type = this.output.pop();

      if (x == -1 && y == 0) {
        this.score = type;
      } else {
        this.map.set(id([x, y]), type);
      }

      if (this.computer.isWaiting()) {
        let [bx, by] = [...this.map.entries()].filter(([k, v]) => v == 4).map(k => k[0])[0].split('#').map(Number);
        this.paddle = [...this.map.entries()].filter(([k, v]) => v == 3).map(k => k[0])[0].split('#').map(Number)[0];

        if (this.ball.length) {
          this.ballMovement = [bx - this.ball[0], by - this.ball[1]];
        }

        this.ball = [bx, by];

        if (!this.headless) {
          this.render();
        }

        this.reading = true;
        this.reader.call(this, this, this.ball, this.ballMovement, this.paddle);
        return;
      }
    }
  }

  read(input) {
    this.input.push(input);
    this.reading = false;
    this.run();
  }

  render() {
    let tiles = [...this.map.keys()].map(k => k.split('#').map(Number)).filter(n => !Number.isNaN(n[0]));

    let maxX = tiles.map(([x, y]) => x).reduce((max, x) => Math.max(max, x));
    let minX = tiles.map(([x, y]) => x).reduce((min, x) => Math.min(min, x));
    let maxY = tiles.map(([x, y]) => y).reduce((max, y) => Math.max(max, y));
    let minY = tiles.map(([x, y]) => y).reduce((min, y) => Math.min(min, y));

    let characters = new Map();
    characters.set(0, ' ');
    characters.set(1, '#');
    characters.set(2, '=');
    characters.set(3, 'T');
    characters.set(4, 'o');

    let image = '';
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        image += characters.get(this.map.get(id([x, y])) || 0);
      }
      image += '\n';
    }

    this.renderer.call(this, image, this.score);
  }

}

module.exports = Launcher;
