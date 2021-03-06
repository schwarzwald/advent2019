const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 16: Part 1', () => {
  it('Calculates the phase output', () => {
    expect(part1('80871224585914546619083218645595')).to.eql('24176176');
  });
});
describe('Day 16: Part 2', () => {
  it('Calculates the phase output for large value with offset', () => {
    expect(part2('03036732577212944063491565474664')).to.eql('84462026')
  })
});
