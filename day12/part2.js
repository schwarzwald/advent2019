const gcd = (a, b) => !b ? a : gcd(b, a % b);
const lcm = (...a) => a.reduce((l, c) => l * c / gcd(l, c));

module.exports = input => {
  let moons = input.split('\n')
    .map(e => /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/.exec(e))
    .map(([_, x, y, z]) => new Object({ x: + x, y: +y, z: +z, vx: 0, vy: 0, vz: 0 }));

  const period = positions => {
    const gravity = (a, b) => a == b ? 0 : (a < b ? 1 : -1);
    const state = moons => moons.map(m => `${m.p}#${m.v}`).join();
    let moons = positions.map(p => new Object({ p: p, v: 0 }));

    let init = state(moons);
    let current = '';
    let p = 0;

    do {
      for (let j = 0; j < moons.length; j++) {
        let m1 = moons[j];

        for (let k = j + 1; k < moons.length; k++) {
          let m2 = moons[k];
          m1.v += gravity(m1.p, m2.p);
          m2.v += gravity(m2.p, m1.p);
        }

        m1.p += m1.v;
      }

      p++;
      current = state(moons);
    } while (current != init);

    return p;
  }

  return lcm(
    period(moons.map(m => m.x)),
    period(moons.map(m => m.y)),
    period(moons.map(m => m.z)));
}
