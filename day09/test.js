const expect = require('expect.js');
const int = require('./int');

describe('Day 09', () => {
  it('Should support relative base instructions and print itself', () => {
    expect(int([109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99])).to.eql([109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99]);
  });

  it('Should support relative base instructions and 16 digit numbers', () => {
    expect(int([1102, 34915192, 34915192, 7, 4, 7, 99, 0]).toString()).to.have.length(16);
  });
});