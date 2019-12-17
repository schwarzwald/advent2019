const phase = input => {
  let output = '';
  let pattern = [0, 1, 0, -1];
  let values = input.split('').map(e => +e);

  for (let i = 1; i <= input.length; i++) {
    let res = 0;
    for (let j = 0; j < input.length; j++) {
      let inp = values[j];
      let pat = pattern[(((j + 1) / i) | 0) % pattern.length];
      res += inp * pat;
    }
    output += Math.abs(res % 10);
  }

  return output;
}

module.exports = input => {
  for (let i = 0; i < 100; i++) {
    input = phase(input);
  }
  return input.substr(0, 8);
}
