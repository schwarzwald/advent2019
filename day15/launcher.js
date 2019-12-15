const Computer = require('./int');

const id = ([x, y]) => `${x}#${y}`;
const direction = dir => {
  switch (dir) {
    case 1: return [0, -1];
    case 2: return [0, 1];
    case 3: return [-1, 0];
    case 4: return [1, 0];
  }
}

class Launcher {
  constructor(instructions, reader, renderer, headless) {
    this.input = [];
    this.output = [];
    this.computer = new Computer(instructions, this.input, this.output);
    this.reading = false;
    this.map = new Map();
    this.reader = reader;
    this.renderer = renderer;
    this.headless = headless;
    this.droid = [0, 0];
    this.map.set(id([0, 0]), 2);
  }

  isFinished() {
    return this.computer.isFinished();
  }

  terminate() {
    return this.computer.finished = true;
  }

  run() {
    while (!this.computer.isFinished()) {
      if (this.reading && !this.input.length) {
        continue;
      }

      if (this.input.length) {
        let dir = direction(this.input[0]);
        if (dir === undefined) {
          this.input;
        }
        let position = [this.droid[0] + dir[0], this.droid[1] + dir[1]];

        this.computer.run();
        let out = this.output.pop();

        this.map.set(id(position), out + 1);

        if (out) {
          this.droid = position;
        }
      } else {
        this.computer.run();
      }

      if (this.computer.isWaiting()) {
        if (!this.headless) {
          this.render();
        }

        this.reading = true;
        let result = this.reader.call(this, this, this.droid, this.map);
        if (result !== false) {
          this.input.push(result);
          this.reading = false;
        } else {
          return;
        }
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
    characters.set(1, '#');
    characters.set(2, ' ');
    characters.set(3, '@');

    let image = '';
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (x == this.droid[0] && y == this.droid[1]) {
          image += 'D';
        } else {
          image += characters.get(this.map.get(id([x, y])) || 2);
        }
      }
      image += '\n';
    }

    this.renderer.call(this, image);
  }

}

module.exports = { Launcher, id };
