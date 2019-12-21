const int = require('./int');

const instr = str => [...str].map(a => a.charCodeAt(0)).concat(10);
const instructions = (...r) => r.reduce((sum, curr) => sum.concat(instr(curr)), []);

module.exports = input =>
  int(input.split(',').map(Number),
    instructions(
      'NOT C J',
      'AND D J',
      'NOT A T',
      'OR T J',
      'WALK')).reverse()[0];
