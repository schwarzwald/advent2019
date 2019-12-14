module.exports = input => {
  let map = input.split('\n')
    .map(r => r.split('=>'))
    .reduce((map, [inp, out]) => {
      let [, q, e] = /(\d+) (\w+)/.exec(out);
      inp.split(', ')
        .map(i => /(\d+) (\w+)/.exec(i))
        .forEach(([, p, f]) => {
          map.set(f, map.get(f) || []);
          map.get(f).push({ element: e, ratio1: q, ratio2: p });
        });
      return map;
    }, new Map());

  const produce = (start, end, quantity) =>
    start == end ?
      quantity :
      map.get(start).reduce((r, c) => r + c.ratio2 * Math.ceil(produce(c.element, end, quantity) / c.ratio1), 0);

  let trillion = 1000000000000;
  let min = 1;
  let max = trillion;

  while (true) {
    let test = Math.round((min + max) / 2)

    let lower = produce('ORE', 'FUEL', test);
    let upper = produce('ORE', 'FUEL', test + 1);

    if (lower <= trillion && upper >= trillion) {
      return test;
    } else if (lower < trillion) {
      min = test;
    } else {
      max = test;
    }
  }
}

