const expect = require('expect.js');
const {
  adjacent,
  strictAdjacent,
  monotonic
} = require('./funcs');

describe('Day 04: Part 1', () => {
  it('Evaluates string as adjacent when contains the same number next to each other', () => {
    expect(adjacent('011234')).to.equal(true);
  });

  it('Evaluates string as non-adjacent when does not contain the same number next to each other', () => {
    expect(adjacent('101234')).to.equal(false);
  });

  it('Evaluates string as monotonic when the numbers are increasing', () => {
    expect(monotonic('012345')).to.equal(true);
  });

  it('Evaluates string as monotonic when the numbers are not decreasing', () => {
    expect(monotonic('00123344555')).to.equal(true);
  });

  it('Evaluates string as non-monotonic when the numbers are decreasing', () => {
    expect(monotonic('0123234')).to.equal(false);
  });
});
describe('Day 04: Part 2', () => {
  it('Evaluates string as strictly adjacent only when it contains the same number next to each other exactly twice', () => {
    expect(strictAdjacent('1123445')).to.equal(true);
  });

  it('Evaluates string as strictly adjacent only when it contains the same number next to each other more than twice, even if other larger group occurs', () => {
    expect(strictAdjacent('11234445')).to.equal(true);
  });

  it('Evaluates string as non-strictly adjacent when it contains the same number next to each other more than twice', () => {
    expect(strictAdjacent('111234445')).to.equal(false);
  });

  it('Evaluates string as non-strictly adjacent when it does not contains the same number next to each other', () => {
    expect(strictAdjacent('12345')).to.equal(false);
  })

});