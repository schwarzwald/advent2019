const int = require('./int');

const instr = str => [...str].map(a => a.charCodeAt(0)).concat(10);
const instructions = (...r) => r.reduce((sum, curr) => sum.concat(instr(curr)), []);

module.exports = input =>
  int(input.split(',').map(Number),
    instructions(
      'OR E T',
      'OR H T',
      'NOT C J',
      'AND T J',
      'NOT A T',
      'AND A T',
      'OR A T',
      'AND B T',
      'NOT T T',
      'OR T J',
      'AND D J',
      'RUN')).reverse()[0];
