module.exports = input => {
  const width = 25;
  const height = 6;
  const size = width * height;

  let layers = [];

  for (let i = 0; i < input.length / size; i++) {
    layers.push([...input.slice(i * size, (i + 1) * size)].map(Number));
  }

  let image = layers.reduce((r, l) => r.map((x, i) => x == 2 ? l[i] : x), [...new Array(size)].map(x => 2));
  let rendered = '';

  for (let y = 0; y < height; y++) {
    rendered += image.slice(y * width, (y + 1) * width).map(c => c == 1 ? '#' : ' ').join('') + '\n';
  }

  return rendered;
}
