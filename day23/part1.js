const Computer = require('./int');

module.exports = input => {
  let instr = input.split(',').map(Number);
  let map = new Map();
  for (let i = 0; i < 50; i++) {
    map.set(i, new Computer(i, instr, [i], []));
  }

  while (true) {
    for (let comp of map.values()) {
      if (comp.input().length < 2) {
        comp.input().push(-1);
      }
      comp.run();
      let addr = comp.output().shift();

      if (!addr) {
        continue;
      }

      comp.run();
      let x = comp.output().shift();
      comp.run();
      let y = comp.output().shift();

      if (addr == 255) {
        return y;
      }

      let dest = map.get(addr);
      dest.input().push(x, y);
    }
  }
}
