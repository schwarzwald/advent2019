module.exports = input => {
  let grid = [];
  let gates = new Map();
  let portals = new Map();

  input.split('\r\n').forEach((row, y) => {
    grid[y] = row.split('');
  });

  const letter = (x, y) => grid[y] && grid[y][x] && grid[y][x].match('[A-Z]');
  const get = (x, y) => grid[y] && grid[y][x] ? grid[y][x] : ' ';
  const parse = id => id.split('#').map(Number);
  const id = (x, y, level) => `${x}#${y}#${level}`;

  const port = (x, y, dx, dy, level) => {
    if (letter(x + dx, y + dy) && back.get(id(x, y)) != 'AA' && back.get(id(x, y)) != 'ZZ') {
      let [x2, y2] = parse(portals.get(id(x, y)));

      let offset = (y2 == 2 || x2 == 2 || y2 == grid.length - 3 || x2 == grid[0].length - 3) ? 1 : -1;

      if (offset == 1 || level != 0) {
        return [x2, y2, level + offset];
      }
    }
    return [x + dx, y + dy, level];
  }

  const identify = (x, y, dx, dy) => {
    if (letter(x, y)) {
      if (letter(x + dx, y + dy) && get(x + dx * 2, y + dy * 2) == '.') {
        let name = get(x, y) + get(x + dx, y + dy);
        gates.set(name, gates.get(name) || new Set());
        gates.get(name).add(id(x + dx * 2, y + dy * 2));
      }
      if (letter(x + dx, y + dy) && get(x - dx, y - dy) == '.') {
        let name = get(x, y) + get(x + dx, y + dy);
        gates.set(name, gates.get(name) || new Set());
        gates.get(name).add(id(x - dx, y - dy));
      }
    }
  }

  const next = (x, y, dx, dy, level, dist) => {
    let [x2, y2, level2] = port(x, y, dx, dy, level);
    return [[x2, y2], dist + 1, level2];
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      identify(x, y, 0, 1);
      identify(x, y, 0, -1);
      identify(x, y, 1, 0);
      identify(x, y, -1, 0);
    }
  }

  let back = new Map();
  [...gates.entries()].forEach(([k, v]) => {
    for (let a of v) {
      back.set(a, k);
    }
  });

  for (let v of gates.values()) {
    if (v.size == 2) {
      let [a, b] = [...v];
      portals.set(a, b);
      portals.set(b, a);
    }
  }

  let start = parse([...gates.get('AA')][0]);
  let goal = parse([...gates.get('ZZ')][0]);
  let queue = [[start, 0, 0]];
  let visited = new Set();

  while (queue.length) {
    let [p, dist, level] = queue.shift();
    let [x, y] = p;

    if (visited.has(id(x, y, level))) {
      continue;
    }

    if (get(x, y) == '#' || letter(x, y)) {
      continue;
    }

    if (x == goal[0] && y == goal[1] && level == 0) {
      return dist;
    }

    queue.push(next(x, y, 0, 1, level, dist));
    queue.push(next(x, y, 0, -1, level, dist));
    queue.push(next(x, y, 1, 0, level, dist));
    queue.push(next(x, y, -1, 0, level, dist));

    visited.add(id(x, y, level));
  }
}
