const pattern = [0, 1, 0, -1];
const cache = new Map();
const val = (row, col, power, size) => {
  let c = row + '#' + col;
  if (cache.has(c)) {
    //  return cache.get(c);
  }

  if (power == 1) {
    return (pattern[(((row + 1) / (col + 1)) | 0) % pattern.length]);
  }

  let result = 0;

  for (let i = 0; i < size; i++) {
    result += (val(row, i, power - 1, size) * val(i, col, 1, size)) % 10;
  }

  //cache.set(c, result);
  return result;
}
const phase = (input, offset, length) => {
  let output = '';
  let values = input.split('').map(e => +e);

  let len = input.length;// * 10000;
  for (let i = offset; i < offset + length; i++) {
    let res = 0;
    for (let j = 0; j < len; j++) {
      let pat = val(j, i, 2, len);
      res += values[j % input.length] * pat;
    }
    output += Math.abs(res % 10);
  }

  return output;
}

module.exports = input => {
  return phase('12345678', 0, 8);//phase('03036732577212944063491565474664', 303673, 8);
}
