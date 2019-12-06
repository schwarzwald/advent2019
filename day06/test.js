const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 06: Part 1', () => {
  it('Calculates number of direct and indirect orbits', () => {
    expect(part1('COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L')).to.eql(42);
  });

});
describe('Day 06: Part 2', () => {
  it('Calculates number of direct and indirect orbits', () => {
    expect(part2('COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN')).to.eql(4);
  });
});
