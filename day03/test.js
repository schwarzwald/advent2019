const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 03: Part 1', () => {
  it('Calculates closest intersection from input 1', () => {
    expect(part1('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83')).to.equal(159);
  });

  it('Calculates closest intersection from input 2', () => {
    expect(part1('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7')).to.equal(135);
  });
});
describe('Day 03: Part 2', () => {
  it('Calculates closest intersection by number of steps from input 1', () => {
    expect(part2('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83')).to.equal(610);
  });

  it('Calculates closest intersection by number of steps from input 2', () => {
    expect(part2('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7')).to.equal(410);
  });
});
