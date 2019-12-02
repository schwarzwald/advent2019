const expect = require('expect.js');
const int = require('./int');

describe('Day 02: Intcodes computer', () => {
  it('Should calculate correct output 1', () => {
    expect(int([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])).to.eql([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
  });


  it('Should calculate correct output 2', () => {
    expect(int([1, 0, 0, 0, 99])).to.eql([2, 0, 0, 0, 99]);
  });

  it('Should calculate correct output 3', () => {
    expect(int([2, 3, 0, 3, 99])).to.eql([2, 3, 0, 6, 99]);
  });

  it('Should calculate correct output 4', () => {
    expect(int([2, 4, 4, 5, 99, 0])).to.eql([2, 4, 4, 5, 99, 9801]);
  });

  it('Should calculate correct output 5', () => {
    expect(int([1, 1, 1, 4, 99, 5, 6, 0, 99])).to.eql([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });
});