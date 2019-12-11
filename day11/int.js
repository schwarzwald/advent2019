class Computer {
  constructor(instructions, input, output) {
    this.inp = input;
    this.out = output;
    this.instructions = instructions.slice();
    this.ip = 0;
    this.finished = false;
    this.base = 0;
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
    const read = (mode, param) => mode == 1 ? position(this.ip + param) : this.instructions[(mode ? this.base : 0) + position(this.ip + param)];
    const write = (mode, param, value) => this.instructions[position(this.ip + param) + (mode ? this.base : 0)] = value;


    while (true) {
      let instr = this.instructions[this.ip];
      let oppcode = instr % 100;
      let mode1 = ((instr / 100) | 0) % 10;
      let mode2 = ((instr / 1000) | 0) % 10;
      let mode3 = ((instr / 10000) | 0) % 10;

      if (oppcode == 99) {
        this.finished = true;
        return true;
      }

      let a = read(mode1, 1) || 0;
      let b = read(mode2, 2) || 0;

      switch (oppcode) {
        case 1:
          write(mode3, 3, a + b);
          this.ip += 4;
          break;
        case 2:
          write(mode3, 3, a * b);
          this.ip += 4;
          break;
        case 3:
          if (this.inp.length) {
            write(mode1, 1, this.read());
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
          write(mode3, 3, a < b ? 1 : 0);
          this.ip += 4;
          break;
        case 8:
          write(mode3, 3, a == b ? 1 : 0);
          this.ip += 4;
          break;
        case 9:
          this.base += a;
          this.ip += 2;
          break;
      }
    }
  }
}

module.exports = Computer;