class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  vector(other) {
    return new Vec2(other.x - this.x, other.y - this.y);
  }
}

class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  dot(other) {
    return this.x * other.x + this.y * other.y;
  }

  cos(other) {
    return this.dot(other) / this.length() / other.length();
  }

  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  norm() {
    let len = this.length();
    return new Vec2(this.x / len, this.y / len);
  }

  eq(other) {
    const round = x => Math.round(x * 10000000);
    return round(this.x) == round(other.x) && round(this.y) == round(other.y);
  }

  angle() {
    let up = new Vec2(0, -1);
    let right = new Vec2(1, 0);
    let ang = Math.acos(up.cos(this));
    return right.dot(this) < 0 ? 2 * Math.PI - ang : ang;
  }
}

const visible = (a, asteroids) => {
  let result = [];

  for (let b of asteroids) {
    if (a == b) {
      continue;
    }

    let visible = true;

    for (let c of asteroids) {
      if (a == c || b == c) {
        continue;
      }
      if (a.vector(b).norm().eq(a.vector(c).norm())) {
        if (a.distance(b) > a.distance(c)) {
          visible = false;
          break;
        }
      }
    }

    if (visible) {
      result.push(b);
    }
  }

  return result;
}

module.exports = input => {
  let asteroids = [];

  input.split('\n').map(r => r.trim()).forEach((row, i) => {
    [...row].forEach((col, j) => {
      if (col == '#') {
        asteroids.push(new Point(j, i));
      }
    });
  });

  let max = 0;
  let station = null;
  for (let a of asteroids) {
    let count = visible(a, asteroids).length;

    if (count > max) {
      station = a;
    }
    max = Math.max(max, count);
  }

  let sorted = visible(station, asteroids)
    .map(b => [b, station.vector(b).angle()])
    .sort((x, y) => x[1] - y[1]);

  let { x, y } = sorted[199][0];

  return x * 100 + y;
}