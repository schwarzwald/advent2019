const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 24: Part 1', () => {
  it('Calculates biodeversity of the first repeated layout', () => {
    expect(part1('....#\n#..#.\n#..##\n..#..\n#....')).to.eql(2129920);
  })
});

describe('Day 24: Part 2', () => {
  it('Calculates number of bugs on recursive levels', () => {
    expect(part2('....#\n#..#.\n#..##\n..#..\n#....', 10)).to.eql(99);
  })
});
