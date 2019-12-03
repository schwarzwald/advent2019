module.exports = input => {
  let [path1, path2] = input.split('\n')
    .map(line => line
      .split(',')
      .map(x => /(\w)(\d+)/.exec(x))
      .map(([_, d, c]) => [d, +c]))
    .map(path => {
      let p = [0, 0];
      let sections = [];

      for (let dir of path) {
        let dx = 0;
        let dy = 0;

        switch (dir[0]) {
          case 'U': dy = -dir[1]; break;
          case 'D': dy = dir[1]; break;
          case 'L': dx = -dir[1]; break;
          case 'R': dx = dir[1]; break;
        }

        let q = [p[0] + dx, p[1] + dy];
        sections.push([p, q]);

        p = q;
      }
      return sections;
    });


  const isHorizontal = ([p1, p2]) => p1[1] == p2[1];
  const intersection = (sec1, sec2) => {
    if (isHorizontal(sec1) && !isHorizontal(sec2)) {
      if (Math.min(sec1[0][0], sec1[1][0]) <= sec2[0][0] && Math.max(sec1[0][0], sec1[1][0]) >= sec2[0][0]
        && Math.min(sec2[0][1], sec2[1][1]) <= sec1[0][1] && Math.max(sec2[0][1], sec2[1][1]) >= sec1[0][1]) {
        return [sec2[0][0], sec1[0][1]];
      }
    } else if (!isHorizontal(sec1) && isHorizontal(sec2)) {
      return intersection(sec2, sec1);
    }

    return null;
  }

  const pointOnLine = (p, [p1, p2]) =>
    Math.min(p1[0], p2[0]) <= p[0] && Math.max(p1[0], p2[0]) >= p[0]
    && Math.min(p1[1], p2[1]) <= p[1] && Math.max(p1[1], p2[1]) >= p[1];

  const steps = (path, p) => {
    let dist = 0;

    for (let [p1, p2] of path) {
      if (pointOnLine(p, [p1, p2])) {
        dist += Math.abs(p1[0] - p[0]) + Math.abs(p1[1] - p[1]);
        return dist;
      }

      dist += Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
    }
  }

  let intersections = [];

  for (sec1 of path1) {
    for (sec2 of path2) {
      let q = intersection(sec1, sec2);
      if (q && (q[0] != 0 || q[1] != 0)) {
        intersections.push(q);
      }
    }
  }

  return intersections
    .map(p => steps(path1, p) + steps(path2, p))
    .reduce((min, curr) => Math.min(min, curr));
}
