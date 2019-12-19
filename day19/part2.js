const int = require('./int');

module.exports = input => {
  let instr = input.split(',').map(Number);

  const calc = (x, y) => int(instr, [x, y])[0];

  const pos = y => {
    let x = 0;
    while (!calc(x, y)) {
      x++;
    }

    let b = 0;
    while (calc(x + b, y)) {
      b++;
    }

    let a = 0;
    while (calc(x, y - a)) {
      a++;
    }

    return [x, b, a];
  }

  const check = (x, y, target) => calc(x + target - 1, y - target + 1) ? -calc(x + 100, y - target + 1) : 1;

  let test = 100;
  let target = 100;
  let [, b, a] = pos(test);

  let y2 = (test * target * (a / b + 1) / a) | 0;
  let x2 = pos(y2)[0];

  while (true) {
    let t = check(x2, y2, target);

    if (!t) {
      return 10000 * x2 + y2 - target + 1;
    }

    y2 += t;
    x2 = pos(y2)[0];
  }
}