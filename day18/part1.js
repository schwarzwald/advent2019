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

  let q = [[pos, 0, 0]];
  let visited = new Set();
  const id = ([x, y], col) => `${x}#${y}#${col}`;
  const contains = (col, key) => {
    return (col >> (key.charCodeAt(0) - 97)) & 1
  }
  const add = (col, key) => {
    return col | (1 << (key.charCodeAt(0) - 97));
  }
  let target = [...keys.keys()].reduce((sum, k) => add(sum, k), 0);

  while (q.length) {
    let [p, collected, dist] = q.shift();

    if (collected == target) {
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
      if (!contains(collected, type.toLowerCase())) {
        continue;
      }
    }

    if (type.match('[a-z]') && !contains(collected, type)) {
      collected = add(collected, type);
    }

    visited.add(id(p, collected));

    q.push([[p[0] + 1, p[1]], collected, dist + 1]);
    q.push([[p[0] - 1, p[1]], collected, dist + 1]);
    q.push([[p[0], p[1] + 1], collected, dist + 1]);
    q.push([[p[0], p[1] - 1], collected, dist + 1]);
  }
}
