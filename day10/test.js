const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 10: Part 1', () => {
  it('Should identify the maximal number of visible asteroids 1', () => {
    expect(part1('.#..#\n.....\n#####\n....#\n...##')).to.eql(8);
  });

  it('Should identify the maximal number of visible asteroids 2', () => {
    expect(part1('......#.#.\n#..#.#....\n..#######.\n.#.#.###..\n.#..#.....\n..#....#.#\n#..#....#.\n.##.#..###\n##...#..#.\n.#....####')).to.eql(33);
  });

});
describe('Day 10: Part 2', () => { });
