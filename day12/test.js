const expect = require('expect.js');
const moons = require('./moons');
const part2 = require('./part2');

describe('Day 12: Part 1', () => {
  it('Calculates total energy of the system', () => {
    expect(moons(`<x=-1, y=0, z=2>
    <x=2, y=-10, z=-7>
    <x=4, y=-8, z=8>
    <x=3, y=5, z=-1>`, 10)).to.eql(179);
  })
});
describe('Day 12: Part 2', () => {
  it('Finds period of the moon system 1', () => {
    expect(part2(`<x=-8, y=-10, z=0>
    <x=5, y=5, z=10>
    <x=2, y=-7, z=3>
    <x=9, y=-8, z=-3>`)).to.eql(4686774924)
  });

  it('Finds period of the moon system 2', () => {
    expect(part2(`<x=-1, y=0, z=2>
    <x=2, y=-10, z=-7>
    <x=4, y=-8, z=8>
    <x=3, y=5, z=-1>`)).to.eql(2772)
  });
});
