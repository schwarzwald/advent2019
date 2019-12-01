const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 1: Part 1 - Calculate fuel from mass by dividing by 3, rounding down and subtracting 2', () => {
  it('Should calculate 2 fuel for mass of 12', () => {
    expect(part1('12')).to.be(2);
  });

  it('Should calculate 2 fuel for mass of 14', () => {
    expect(part1('14')).to.be(2);
  });

  it('Should calculate 654 fuel for mass of 1969', () => {
    expect(part1('1969')).to.be(654);
  });


  it('Should calculate 33583 fuel for mass of 100756', () => {
    expect(part1('100756')).to.be(33583);
  });
});

describe('Day 2: Part 2 - Calculate fuel from mass and also from fuel', () => {

  it('Should calculate 2 fuel for mass of 14', () => {
    expect(part2('14')).to.be(2);
  });

  it('Should calculate 2 fuel for mass of 654', () => {
    expect(part2('1969')).to.be(966);
  });

  it('Should calculate 2 fuel for mass of 100756', () => {
    expect(part2('100756')).to.be(50346);
  });

});