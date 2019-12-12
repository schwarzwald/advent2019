module.exports = (input, steps) => {
  let moons = input.split('\n')
    .map(e => /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/.exec(e))
    .map(([_, x, y, z]) => new Object({ x: + x, y: +y, z: +z, vx: 0, vy: 0, vz: 0 }));

  let gravity = (a, b) => a == b ? 0 : (a < b ? 1 : -1);
  let potential = m => Math.abs(m.x) + Math.abs(m.y) + Math.abs(m.z);
  let kinectic = m => Math.abs(m.vx) + Math.abs(m.vy) + Math.abs(m.vz);

  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < moons.length; j++) {
      let m1 = moons[j];

      for (let k = j + 1; k < moons.length; k++) {
        let m2 = moons[k];

        m1.vx += gravity(m1.x, m2.x);
        m1.vy += gravity(m1.y, m2.y);
        m1.vz += gravity(m1.z, m2.z);

        m2.vx += gravity(m2.x, m1.x);
        m2.vy += gravity(m2.y, m1.y);
        m2.vz += gravity(m2.z, m1.z);
      }

      m1.x += m1.vx;
      m1.y += m1.vy;
      m1.z += m1.vz;
    }
  }

  return moons.reduce((sum, moon) => sum += potential(moon) * kinectic(moon), 0);
}