module.exports = (instructions, input) => {
  let ip = 0;
  let output = [];

  instructions = instructions.slice();

  const position = i => instructions[i];

  while (true) {
    let instr = instructions[ip];
    let oppcode = instr % 100;
    let mode1 = ((instr / 100) | 0) % 10;
    let mode2 = ((instr / 1000) | 0) % 10;

    if (oppcode == 99) {
      return output;
    }

    let a = mode1 ? position(ip + 1) : instructions[position(ip + 1)];
    let b = mode2 ? position(ip + 2) : instructions[position(ip + 2)];

    switch (oppcode) {
      case 1:
        instructions[position(ip + 3)] = a + b;
        ip += 4;
        break;
      case 2:
        instructions[position(ip + 3)] = a * b;
        ip += 4;
        break;
      case 3:
        instructions[position(ip + 1)] = input.shift();
        ip += 2;
        break;
      case 4:
        output.push(a);
        ip += 2;
        break;
      case 5:
        ip = a ? b : ip + 3;
        break;
      case 6:
        ip = a == 0 ? b : ip + 3;
        break;
      case 7:
        instructions[position(ip + 3)] = a < b ? 1 : 0;
        ip += 4;
        break;
      case 8:
        instructions[position(ip + 3)] = a == b ? 1 : 0;
        ip += 4;
        break;
    }
  }
}