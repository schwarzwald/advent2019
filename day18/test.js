const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 18: Part 1', () => {
  it('Finds the shortest distance to collect all keys', () => {
    expect(part1(
      `########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`)).to.eql(132)
  })
});
describe('Day 18: Part 2', () => { });
