const int = require('./int');

module.exports = input => {
  let instructions = input.split(',').map(Number);

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      instructions[1] = noun;
      instructions[2] = verb;

      if (int(instructions)[0] == 19690720) {
        return 100 * noun + verb;
      }
    }
  }
}