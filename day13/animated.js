const Launcher = require('./launcher');
const ai = require('./ai');

module.exports = input => {
  let instructions = input.split(',').map(Number);
  instructions[0] = 2;

  let launcher = new Launcher(instructions, (l, b, bm, p) => {
    setTimeout(() => {
      ai(l, b, bm, p);
    }, 5);
  }, (i, s) => {
    console.clear();
    console.log(i);
    console.log(`Score: ${s}`);
  });

  launcher.run();
}
