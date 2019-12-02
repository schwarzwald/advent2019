#/bin/bash
d=day$1

if [ ! -d $d ]; then
  mkdir $d
  echo Created folder $d
fi

if [ ! -f $d/part1.js ]; then
  touch $d/part1.js
  echo Created part1.js
  echo "module.exports = input => {}" >> $d/part1.js
fi

if [ ! -f $d/part2.js ]; then
  touch $d/part2.js
  echo Created part2.js
  echo "module.exports = input => {}" >> $d/part2.js
fi

if [ ! -f $d/test.js ]; then
  touch $d/test.js
  echo Created test.js
  echo "const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day $1: Part 1', () => {});
describe('Day $1: Part 2', () => {});" >> $d/test.js
fi

if [ ! -f $d/input.txt ]; then
  touch $d/input.txt
  echo Created input.txt
fi
