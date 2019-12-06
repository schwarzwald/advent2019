module.exports = input => {
  let orbits = input.split('\n')
    .map(o => o.split(')').map(x => x.trim()))
    .reduce((m, [a, b]) => m.set(b, a), new Map());

  let count = 0;

  for (let key of orbits.keys()) {
    while (orbits.has(key)) {
      count++;
      key = orbits.get(key);
    }
  }

  return count;
}
