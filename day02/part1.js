const int = require('./int');

module.exports = input => {
  let instructions = input.split(',').map(Number);

  instructions[1] = 12;
  instructions[2] = 2;

  return int(instructions)[0];
}