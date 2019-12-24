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
  return value ? (div | (1 << i)) : (div & ~(1 << i));
}
module.exports = input => {
  let current = input.split('\n')
    .flatMap(r => r.trim().split(''))
    .reduce((div, p, i) => p == '#' ? div | (1 << i) : div, 0);

  let seen = new Set();
  let neighbours = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (!seen.has(current)) {
    seen.add(current);
    let next = current;

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        let sum = neighbours.reduce((sum, [dx, dy]) => sum + get(current, x + dx, y + dy), 0);

        if (get(current, x, y) && sum != 1) {
          next = set(next, x, y, 0);
        }
        if (!get(current, x, y) && sum > 0 && sum < 3) {
          next = set(next, x, y, 1);
        }
      }
    }

    current = next;
  }

  return current;
}
