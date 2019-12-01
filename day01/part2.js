const fuel = mass => {
  let f = Math.floor(mass / 3) - 2;
  return f > 0 ? f + fuel(f) : 0;
}

module.exports = input =>
  input.split('\n')
    .reduce((acc, curr) => acc += fuel(curr), 0); 