const { Launcher, id } = require('./launcher');
const ai = require('./ai');

module.exports = input => {
  let launcher = new Launcher(input.split(',').map(Number), ai(), image => { }, true);
  launcher.run();

  let [ox, oy] = [...launcher.map.entries()].filter(([k, v]) => v == 3)[0][0].split('#').map(Number);
  let queue = [[ox, oy, 0]];
  let visited = new Set();
  let max = 0;

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

    queue.push([x + 1, y, steps + 1]);
    queue.push([x - 1, y, steps + 1]);
    queue.push([x, y + 1, steps + 1]);
    queue.push([x, y - 1, steps + 1]);

    max = Math.max(max, steps);
  }

  return max;
}

