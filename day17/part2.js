const int = require('./int');
const id = (x, y) => `${x}#${y}`;

const left = ([x, y]) => [y, -x];
const right = ([x, y]) => [-y, x];

module.exports = input => {
  let out = int(input.split(',').map(Number), []);
  let size = out.indexOf(10) + 1;
  let path = new Set();
  let dir = [0, 0];
  let pos = [];

  out.forEach((cell, i) => {
    let x = i % size;
    let y = (i / size) | 0;

    if (cell == 35) {
      path.add(id(x, y));
    }

    if (cell == '<'.charCodeAt(0)) {
      dir = [-1, 0];
      pos = [x, y];
    } else if (cell == '>'.charCodeAt(0)) {
      dir = [1, 0];
      pos = [x, y];
    } else if (cell == '^'.charCodeAt(0)) {
      dir = [0, -1];
      pos = [x, y];
    } else if (cell == 'v'.charCodeAt(0)) {
      dir = [0, 1];
      pos = [x, y];
    }
  });

  let instr = [];
  let forward = 0;
  while (true) {
    let [x, y] = pos;
    if (path.has(id(x + dir[0], y + dir[1]))) {
      pos = [x + dir[0], y + dir[1]];
      forward++;
    } else {
      if (forward) {
        instr.push(forward);
      }

      forward = 0;
      let r = right(dir);
      let l = left(dir);

      if (path.has(id(x + r[0], y + r[1]))) {
        instr.push('R');
        dir = r;
      } else if (path.has(id(x + l[0], y + l[1]))) {
        instr.push('L');
        dir = l;
      } else {
        break;
      }
    }
  }

  let main = ['A', 'B', 'A', 'C', 'B', 'C', 'A', 'C', 'B', 'C'];
  let a = ['L', '8', 'R', '10', 'L', '10'];
  let b = ['R', '10', 'L', '8', 'L', '8', 'L', '10'];
  let c = ['L', '4', 'L', '6', 'L', '8', 'L', '8', ];

  const convert = main => {
    let m = main.reduce((res, curr) => {
      [...curr].map(c => c.charCodeAt(0)).forEach(c => res.push(c));
      res.push(44);
      return res;
    }, []);

    m[m.length - 1] = 10;
    return m;
  }

  let m = convert(main);
  let am = convert(a);
  let bm = convert(b);
  let cm = convert(c);

  m = m.concat(...am);
  m = m.concat(...bm);
  m = m.concat(...cm);
  m = m.concat('n'.charCodeAt(0), 10);


  let instructions = input.split(',').map(Number);
  instructions[0] = 2;
  out = int(instructions, m);

  return out[out.length - 1];
}