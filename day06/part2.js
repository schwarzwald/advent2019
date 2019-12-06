module.exports = input => {
  let orbits = input.split('\n')
    .map(o => o.split(')').map(x => x.trim()))
    .reduce((m, [a, b]) => m.set(b, a), new Map());

  const path = name => {
    let p = [];
    while (orbits.has(name)) {
      name = orbits.get(name);
      p.push(name);
    }

    return p;
  }

  let p = path('YOU');
  let q = path('SAN');

  for (let i = 0; i < p.length; i++) {
    let i2 = q.indexOf(p[i]);

    if (i2 >= 0) {
      return i + i2;
    }
  }
}
