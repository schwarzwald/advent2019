const { Launcher, id } = require('./launcher');
const ai = require('./ai');

module.exports = input => {
  let launcher = new Launcher(input.split(',').map(Number), ai(), _ => { }, true);
  launcher.run();

  let queue = [[0, 0, 0]];
  let visited = new Set();

  while (queue.length) {
    let current = queue.shift();

    if (visited.has(id(current))) {
      continue;
    }

    visited.add(id(current));

    let type = launcher.map.get(id(current)) || 2;
    let [x, y, steps] = current;

    if (type == 1) {
      continue;
    }

    if (type == 3) {
      return steps;
    }

    queue.push([x + 1, y, steps + 1]);
    queue.push([x - 1, y, steps + 1]);
    queue.push([x, y + 1, steps + 1]);
    queue.push([x, y - 1, steps + 1]);
  }
}

