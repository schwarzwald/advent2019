module.exports = input => {
  let grid = [];
  let pos = [];
  let keys = new Map();

  input.split('\n').forEach((row, i) => {
    if (!grid[i]) {
      grid.push(new Array(row.length));
    }

    row.split('').forEach((val, j) => {
      grid[i][j] = val;

      if (val == '@') {
        pos = [j, i];
      }

      if (val.match('[a-z]')) {
        keys.set(val, [j, i]);
      }
    });
  });

  let q = [[pos, [], 0]];
  let visited = new Set();
  const id = ([x, y], col) => `${x}#${y}#${col.join('')}`;

  while (q.length) {
    let [p, collected, dist] = q.shift();

    if (collected.length == keys.size) {
      return dist - 1;
    }

    if (visited.has(id(p, collected))) {
      continue;
    }

    let type = grid[p[1]][p[0]];
    if (type == '#') {
      continue;
    }

    if (type.match('[A-Z]')) {
      if (!collected.includes(type.toLowerCase())) {
        continue;
      }
    }

    if (type.match('[a-z]') && !collected.includes(type)) {
      collected = collected.concat(type);
    }

    visited.add(id(p, collected.sort()));

    q.push([[p[0] + 1, p[1]], collected, dist + 1]);
    q.push([[p[0] - 1, p[1]], collected, dist + 1]);
    q.push([[p[0], p[1] + 1], collected, dist + 1]);
    q.push([[p[0], p[1] - 1], collected, dist + 1]);
  }
}
