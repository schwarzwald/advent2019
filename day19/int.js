module.exports = (instructions, input) => {
  let ip = 0;
  let base = 0;
  let output = [];

  instructions = instructions.slice();

  const position = i => instructions[i];
  const read = (mode, param) => mode == 1 ? position(ip + param) : instructions[(mode ? base : 0) + position(ip + param)];
  const write = (mode, param, value) => instructions[position(ip + param) + (mode ? base : 0)] = value;

  while (true) {
    let instr = instructions[ip];
    let oppcode = instr % 100;
    let mode1 = ((instr / 100) | 0) % 10;
    let mode2 = ((instr / 1000) | 0) % 10;
    let mode3 = ((instr / 10000) | 0) % 10;

    if (oppcode == 99) {
      return output;
    }

    let a = read(mode1, 1) || 0;
    let b = read(mode2, 2) || 0;

    switch (oppcode) {
      case 1:
        write(mode3, 3, a + b);
        ip += 4;
        break;
      case 2:
        write(mode3, 3, a * b);
        ip += 4;
        break;
      case 3:
        write(mode1, 1, input.shift());
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
        write(mode3, 3, a < b ? 1 : 0);
        ip += 4;
        break;
      case 8:
        write(mode3, 3, a == b ? 1 : 0);
        ip += 4;
        break;
      case 9:
        base += a;
        ip += 2;
        break;
    }
  }
}