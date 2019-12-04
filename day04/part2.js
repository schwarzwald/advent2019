const {
  strictAdjacent,
  monotonic
} = require('./funcs');

module.exports = input => {
  let [low, high] = input.split('-').map(Number);

  let count = 0;

  for (let i = low; i <= high; i++) {
    let str = i.toString();
    if (strictAdjacent(str) && monotonic(str)) {
      count++;
    }
  }

  return count;
}