module.exports = input =>
  input.split('\n')
    .reduce((acc, curr) => acc += Math.floor(curr / 3) - 2, 0); 