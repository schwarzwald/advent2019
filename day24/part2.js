const get = (div, x, y) => {
  if (y > 4 || y < 0 || x < 0 || x > 4) {
    return 0;
  }

  let i = 5 * y + x;

  return (div >> i) & 1;
}

const set = (div, x, y, value) => {
  if (y > 4 || y < 0 || x < 0 || x > 4) {
    return div;
  }

  let i = 5 * y + x;
  return value ? div | (1 << i) : div & ~(1 << i);
}
module.exports = (input, minutes = 200) => {
  let current = input.split('\n')
    .flatMap(r => r.trim().split(''))
    .reduce((div, p, i) => p == '#' ? div | (1 << i) : div, 0);

  let neighbours = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  let currentLevels = new Map();
  let nextLevels = new Map();

  currentLevels.set(0, current);

  while (minutes--) {
    let min = Number.MAX_VALUE;
    let max = 0;

    for (let level of currentLevels.keys()) {
      min = Math.min(min, level);
      max = Math.max(max, level);
    }

    currentLevels.set(min - 1, 0);
    currentLevels.set(max + 1, 0);

    for (let [level, current] of currentLevels.entries()) {
      let next = current;
      let outer = currentLevels.get(level - 1) || 0;
      let inner = currentLevels.get(level + 1) || 0;

      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          if (x == 2 && y == 2) {
            continue;
          }

          let sum = neighbours.reduce((sum, [dx, dy]) => {
            let ay = dy * dy;
            let ax = dx * dx;

            if (x + dx == -1 || x + dx == 5 || y + dy == -1 || y + dy == 5) {
              return sum + get(outer, 2 + dx, 2 + dy);
            }

            if (x + dx == 2 && y + dy == 2) {
              for (let i = 0; i < 5; i++) {
                sum += get(inner, i * ay + (2 - 2 * dx) * ax, i * ax + (2 - 2 * dy) * ay);
              }
              return sum;
            }

            return sum + get(current, x + dx, y + dy);
          }, 0);

          if (get(current, x, y) && sum != 1) {
            next = set(next, x, y, 0);
          }
          if (!get(current, x, y) && sum > 0 && sum < 3) {
            next = set(next, x, y, 1);
          }
        }
      }

      nextLevels.set(level, next);
    }

    for (let [level, value] of nextLevels.entries()) {
      currentLevels.set(level, value);
    }
  }

  return [...currentLevels.values()].reduce((sum, c) => {
    for (let i = 0; i < 25; i++) {
      sum += (c >> i) & 1;
    }
    return sum;
  }, 0)
}