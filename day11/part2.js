const Computer = require('./int');

module.exports = input => {
  let inp = [1];
  let out = [];
  let map = new Map();

  let computer = new Computer(input.split(',').map(Number), inp, out);
  let position = [0, 0];
  let direction = [0, 1];

  const id = ([x, y]) => `${x}#${y}`;

  while (!computer.isFinished()) {
    computer.run();
    computer.run();

    let dir = out.pop();
    let color = out.pop();

    map.set(id(position), color);

    direction = dir ? [direction[1], -direction[0]] : [-direction[1], direction[0]];

    position[0] += direction[0];
    position[1] += direction[1];

    inp.push(map.get(id(position)) || 0);
  }

  let tiles = [...map.keys()].map(k => k.split('#').map(Number));

  let maxX = tiles.map(([x, y]) => x).reduce((max, x) => Math.max(max, x));
  let minX = tiles.map(([x, y]) => x).reduce((min, x) => Math.min(min, x));
  let maxY = tiles.map(([x, y]) => y).reduce((max, y) => Math.max(max, y));
  let minY = tiles.map(([x, y]) => y).reduce((min, y) => Math.min(min, y));

  let image = '';
  for (let y = maxY; y >= minY; y--) {
    for (let x = minX; x <= maxX; x++) {
      image += (map.get(id([x, y])) || 0) ? '#' : ' ';
    }
    image += '\n';
  }

  return image;
}
