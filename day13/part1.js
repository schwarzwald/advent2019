const Computer = require('../day11/int');
module.exports = input => {
  let out = [];
  let tiles = [];

  let computer = new Computer(input.split(',').map(Number), [], out);

  while (!computer.isFinished()) {
    computer.run();
    let x = out.pop();
    computer.run();
    let y = out.pop();
    computer.run();
    let type = out.pop();

    tiles.push({ x, y, type });
  }

  return tiles.filter(t => t.type == 2).length;
}
