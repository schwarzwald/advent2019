/**
 * THIS IS A TOTAL DISASTER
 * NOT A COMPLETE SOLUTION, THIS ACCIDENTALLY WORKS FOR THE 
 * PUZZLE INPUT BUT IT'S GENERALLY FLAWED * 
 */
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

  const id = ([x, y], col) => (100 * x + y) * (1 << 26) + col;
  const id2 = ([x, y]) => `${x}#${y}`;
  const contains = (col, key) => {
    return (col >> (key.charCodeAt(0) - 97)) & 1
  }
  const add = (col, key) => {
    return col | (1 << (key.charCodeAt(0) - 97));
  }

  const frees = (map, collected) => {
    let f = [];
    for (let [k, v] of map.entries()) {
      if (!contains(collected, k) && v.every(w => contains(collected, w.toLowerCase()))) {
        f.push(k);
      }
    }

    return f;
  }

  const cache = new Map();
  const distance = (start, [x2, y2]) => {
    let queue = [[start, 0, []]];
    let visited = new Set();

    let idp1 = id2(start);
    let idp2 = id2([x2, y2]);
    let p1 = `${idp1}#${idp2}`;
    let p2 = `${idp2}#${idp1}`;

    if (cache.has(idp1)) {
      return cache.get(idp1);
    }

    while (queue.length) {
      let [p, dist, keys] = queue.shift();
      let [x, y] = p;
      let idx = id2([x, y]);

      if (visited.has(idx)) {
        continue;
      }

      let type = grid[y][x];

      if (type == '#') {
        continue;
      }

      if (x == x2 && y == y2) {
        cache.set(p1, [dist, keys]);
        cache.set(p2, [dist, keys]);
        return [dist, keys];
      }

      if (type.match('[a-z]')) {
        keys = keys.concat(type);
      }

      queue.push([[x, y + 1], dist + 1, keys]);
      queue.push([[x, y - 1], dist + 1, keys]);
      queue.push([[x + 1, y], dist + 1, keys]);
      queue.push([[x - 1, y], dist + 1, keys]);

      visited.add(idx);
    }
  }

  const reachable = (pos) => {
    let queue = [[pos, [], []]];
    let visited = new Set();
    let blocks = new Map();

    while (queue.length) {
      let [p, door] = queue.shift();
      let [x, y] = p;
      let idx = id2([x, y]);

      if (visited.has(idx)) {
        continue;
      }

      let type = grid[y][x];

      if (type == '#') {
        continue;
      }

      if (type.match('[A-Z]')) {
        door = door.concat(type);
      }

      if (type.match('[a-z]')) {
        blocks.set(type, door);
      }

      queue.push([[x, y + 1], door]);
      queue.push([[x, y - 1], door]);
      queue.push([[x + 1, y], door]);
      queue.push([[x - 1, y], door]);

      visited.add(idx);
    }

    return blocks;
  }


  grid[pos[1]][pos[0]] = '#';

  grid[pos[1] + 1][pos[0]] = '#';
  grid[pos[1] - 1][pos[0]] = '#';

  grid[pos[1]][pos[0] + 1] = '#';
  grid[pos[1]][pos[0] - 1] = '#';

  let r1 = [pos[0] + 1, pos[1] + 1];
  let r2 = [pos[0] + 1, pos[1] - 1];
  let r3 = [pos[0] - 1, pos[1] + 1];
  let r4 = [pos[0] - 1, pos[1] - 1];

  const shortest = (pos) => {

    let visited = new Set();
    let reach = reachable(pos);
    let target = [...reach.keys()].reduce((sum, k) => add(sum, k), 0);

    let col = 0;
    for (let [k, v] of reach.entries()) {
      v.forEach(w => {
        col = add(col, w.toLowerCase())
      });
    }

    target = target | col;

    let q = [[pos, col, 0]];

    while (q.length) {
      let [p, collected, dist] = q.shift();

      if (collected == target) {
        return dist - 1;
      }

      if (visited.has(id(p, collected))) {
        continue;
      }
      visited.add(id(p, collected));

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

      q.push([[p[0] + 1, p[1]], collected, dist + 1]);
      q.push([[p[0] - 1, p[1]], collected, dist + 1]);
      q.push([[p[0], p[1] + 1], collected, dist + 1]);
      q.push([[p[0], p[1] - 1], collected, dist + 1]);
    }

  }
  return shortest(r1) + shortest(r2) + shortest(r3) + shortest(r4);
}
