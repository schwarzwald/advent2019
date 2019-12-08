module.exports = input => {
  const size = 25 * 6;
  let layers = [];

  for (let i = 0; i < input.length / size; i++) {
    layers.push(input.slice(i * size, (i + 1) * size));
  }

  let l = layers
    .map(curr => [...curr].filter(c => c == 0).length)
    .reduce(([ix, min], curr, i) => [ix = curr < min ? i : ix, Math.min(min, curr)], [-1, Number.MAX_VALUE])[0];

  let min = [...layers[l]];
  return min.filter(c => c == 1).length * min.filter(c => c == 2).length;
}
