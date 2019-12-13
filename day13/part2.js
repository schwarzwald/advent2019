const Launcher = require('./launcher');
const ai = require('./ai');

module.exports = input => {
  let instructions = input.split(',').map(Number);
  instructions[0] = 2;

  let launcher = new Launcher(instructions, ai, (i, s) => { }, true);
  launcher.run();


  return launcher.score;
}
