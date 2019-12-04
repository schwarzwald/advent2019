const adjacent = str => /(\d)\1/.test(str);
const monotonic = str => [...str].reduce(([res, prev], curr) => [res && curr >= prev, curr], [true, '0'])[0];
const strictAdjacent = str => {
  let small = (str.match(/(\d)\1/g) || []).map(x => x.charAt(0));

  if (small.length == 0) {
    return false;
  }

  let large = (str.match(/(\d)\1\1/g) || []).map(x => x.charAt(0));

  return large.length == 0 || small.some(x => !large.includes(x));
}

module.exports = {
  adjacent,
  strictAdjacent,
  monotonic
}