const int = require('./int');

module.exports = input => {
  let instr = input.split(',').map(Number);
  let res = 0;

  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      res += int(instr, [x, y])[0];
    }
  }
  return res;
}