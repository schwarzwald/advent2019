module.exports = instructions => {
  let ip = 0;

  instructions = instructions.slice();

  const position = i => instructions[i];

  while (true) {
    switch (instructions[ip]) {
      case 99:
        return instructions;
      case 1:
        instructions[position(ip + 3)] = instructions[position(ip + 1)] + instructions[position(ip + 2)];
        break;
      case 2:
        instructions[position(ip + 3)] = instructions[position(ip + 1)] * instructions[position(ip + 2)];
        break;
    }

    ip += 4;
  }
}