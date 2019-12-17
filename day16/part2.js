module.exports = input => {
  let offset = +input.substr(0, 7);

  let numbers = input.split('').map(v => +v);
  let vals = [];

  for (let i = offset; i < input.length * 10000; i++) {
    vals.push(numbers[i % input.length]);
  }

  for (let i = 0; i < 100; i++) {
    let sum = 0;
    for (let j = vals.length - 1; j >= 0; j--) {
      sum += vals[j];
      vals[j] = sum % 10;
    }
  }

  return vals.slice(0, 8).join('');
}