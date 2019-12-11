const Computer = require('./int');

module.exports = input => {
  let inp = [0];
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

  return map.size;
}
