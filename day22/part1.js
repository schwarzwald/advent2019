const rev = (x, n) => n - x - 1;
const rot = (x, p, n) => (n + x - p) % n;
const inc = (x, p, n) => (x * p) % n;

module.exports = input =>
  input.split('\n')
    .reduce((t, trick) => {
      if (trick.match('deal into new stack')) {
        return (x, n) => rev(t(x, n), n);
      } else if (trick.match('cut')) {
        return (x, n) => rot(t(x, n), +trick.match(/(-?[\d]+)/)[1], n);
      } else {
        return (x, n) => inc(t(x, n), +trick.match(/(-?[\d]+)/)[1], n);
      }
    }, x => x)(2019, 10007);
