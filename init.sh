#/bin/bash
d=day$1

if [ ! -d $d ]; then
  mkdir $d
  echo Created folder $d
fi

if [ ! -f $d/part1.js ]; then
  touch $d/part1.js
  echo Created part1.js
fi

if [ ! -f $d/part2.js ]; then
  touch $d/part2.js
  echo Created part2.js
fi

if [ ! -f $d/input.txt ]; then
  touch $d/input.txt
  echo Created input.txt
fi
