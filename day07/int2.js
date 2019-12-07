class Computer {
  constructor(instructions, input, output) {
    this.inp = input;
    this.out = output;
    this.instructions = instructions.slice();
    this.ip = 0;
    this.finished = false;
  }

  input() {
    return this.inp;
  }

  output() {
    return this.out;
  }

  read() {
    return this.inp.shift();
  }

  write(out) {
    this.out.push(out);
  }

  isFinished() {
    return this.finished;
  }

  run() {
    if (this.finished) {
      return true;
    }

    const position = i => this.instructions[i];

    while (true) {
      let instr = this.instructions[this.ip];
      let oppcode = instr % 100;
      let mode1 = ((instr / 100) | 0) % 10;
      let mode2 = ((instr / 1000) | 0) % 10;

      if (oppcode == 99) {
        this.finished = true;
        return true;
      }

      let a = mode1 ? position(this.ip + 1) : this.instructions[position(this.ip + 1)];
      let b = mode2 ? position(this.ip + 2) : this.instructions[position(this.ip + 2)];

      switch (oppcode) {
        case 1:
          this.instructions[position(this.ip + 3)] = a + b;
          this.ip += 4;
          break;
        case 2:
          this.instructions[position(this.ip + 3)] = a * b;
          this.ip += 4;
          break;
        case 3:
          if (this.inp.length) {
            this.instructions[position(this.ip + 1)] = this.read();
            this.ip += 2;
          } else {
            return false;
          }
          break;
        case 4:
          this.write(a);
          this.ip += 2;
          return false;
        case 5:
          this.ip = a ? b : this.ip + 3;
          break;
        case 6:
          this.ip = a == 0 ? b : this.ip + 3;
          break;
        case 7:
          this.instructions[position(this.ip + 3)] = a < b ? 1 : 0;
          this.ip += 4;
          break;
        case 8:
          this.instructions[position(this.ip + 3)] = a == b ? 1 : 0;
          this.ip += 4;
          break;
      }
    }
  }
}

module.exports = Computer;