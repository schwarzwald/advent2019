const int = require('./int');
const id = (x, y) => `${x}#${y}`;

module.exports = input => {
  let out = int(input.split(',').map(Number), []);
  let size = out.indexOf(10) + 1;
  let path = new Set();

  out.forEach((cell, i) => {
    let x = i % size;
    let y = (i / size) | 0;

    if (cell == 35) {
      path.add(id(x, y));
    }
  });

  let res = 0;

  for (let i = 0; i <= out.length / size; i++) {
    for (let j = 0; j <= size; j++) {
      if (path.has(id(j, i)) &&
        path.has(id(j - 1, i)) &&
        path.has(id(j + 1, i)) &&
        path.has(id(j, i + 1)) &&
        path.has(id(j, i - 1))) {
        res += j * i;
      }
    }
  }
  return res;
}