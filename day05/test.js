const expect = require('expect.js');
const int = require('./int');
const part2 = require('./part2');

describe('Day 05: Part 1', () => {
  it('Should support parameter modes of instructions', () => {
    expect(int([1002, 4, 3, 4, 33], [])).to.eql([]);
  });

  it('Should support reading input and printing output', () => {
    expect(int([3, 0, 4, 0, 99], [123])).to.eql([123]);
  });
});
describe('Day 05: Part 2', () => {
  it('Should support equal oppcode with position mode', () => {
    expect(int([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], [8])).to.eql([1]);
    expect(int([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], [7])).to.eql([0]);
  });
  it('Should support less than oppcode with position mode', () => {
    expect(int([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], [7])).to.eql([1]);
    expect(int([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], [9])).to.eql([0]);
  });

  it('Should support equal oppcode with immediate mode', () => {
    expect(int([3, 3, 1108, -1, 8, 3, 4, 3, 99], [8])).to.eql([1]);
    expect(int([3, 3, 1108, -1, 8, 3, 4, 3, 99], [7])).to.eql([0]);
  });

  it('Should support less than oppcode with immediate mode', () => {
    expect(int([3, 3, 1107, -1, 8, 3, 4, 3, 99], [7])).to.eql([1]);
    expect(int([3, 3, 1107, -1, 8, 3, 4, 3, 99], [9])).to.eql([0]);
  });

  it('Should support jump oppcode with position mode', () => {
    expect(int([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], [1])).to.eql([1]);
    expect(int([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], [0])).to.eql([0]);
  });

  it('Should support jump oppcode with immediate mode', () => {
    expect(int([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], [1])).to.eql([1]);
    expect(int([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], [0])).to.eql([0]);
  });
});