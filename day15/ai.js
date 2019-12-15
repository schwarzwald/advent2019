const { id } = require('./launcher');

module.exports = () => {
  let backtrack = [];
  let visits = new Map();
  let last = [0, 0];

  return (launcher, droid) => {
    if (last[0] == droid[0] && last[1] == droid[1]) {
      backtrack.pop();
    }

    let visit = visits.get(id(droid));

    if (!visit) {
      visit = [];
      let dx = droid[0] - last[0];
      let dy = droid[1] - last[1];

      if (dy != 1) {
        visit.push(1);
      }
      if (dy != -1) {
        visit.push(2);
      }
      if (dx != 1) {
        visit.push(3);
      }
      if (dx != -1) {
        visit.push(4);
      }

      visits.set(id(droid), visit);
    }

    if (visit.length == 0) {
      let dir = 0;

      switch (backtrack.pop()) {
        case 1: dir = 2; break;
        case 2: dir = 1; break;
        case 3: dir = 4; break;
        case 4: dir = 3; break;
      }

      if (dir == 0) {
        launcher.terminate();
      }

      return dir;
    } else {
      let dir = visit.shift();
      last = droid;
      backtrack.push(dir);
      return dir;
    }
  }
}