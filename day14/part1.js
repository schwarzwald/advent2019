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

  return produce('ORE', 'FUEL', 1);
}

