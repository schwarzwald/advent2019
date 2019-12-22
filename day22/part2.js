const modexp = (a, exp, mod) => {
  let powers = new Map();
  powers.set(0n, 1n);
  powers.set(1n, a);

  let order = 1n;
  let result = 1n;

  while (exp) {
    if (order > 1n) {
      powers.set(order, (powers.get((order / 2n) | 0n) * powers.get((order / 2n) | 0n)) % mod);
    }

    if (exp & 1n) {
      result = (result * powers.get(order)) % mod
    }

    order *= 2n;
    exp = (exp / 2n) | 0n;
  }

  return result;
}

const xgcd = (a, b) => {
  if (b == 0n) {
    return [1n, 0n, a];
  }
  let [x, y, d] = xgcd(b, a % b);
  return [y, x - y * ((a / b) | 0n), d];
}

const modinverse = (a, b) => (b + xgcd(a, b)[0]) % b;
const sum = (a, n, mod) => (modexp(a, n + 1n, mod) - 1n) * modinverse(a - 1n, mod);

module.exports = input => {
  let size = 119315717514047n;
  let exp = 101741582076661n;

  let [a, b] = input.split('\n')
    .reduce(([a, b], trick) => {
      if (trick.match('deal into new stack')) {
        return [(size - a) % size, (size - b - 1n) % size];
      } else if (trick.match('cut')) {
        let q = BigInt(+trick.match(/(-?[\d]+)/)[1]);
        return [a, (size + b - q) % size];
      } else {
        let q = BigInt(+trick.match(/(-?[\d]+)/)[1]);
        return [(a * q) % size, (b * q) % size];
      }
    }, [1n, 0n]);

  return size + ((2020n - b * sum(a, exp - 1n, size)) * modinverse(modexp(a, exp, size), size)) % size;
}
