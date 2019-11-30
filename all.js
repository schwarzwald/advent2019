const fs = require('fs');

const processFolder = (folder, path) => {
  console.time('Execution');
  path += path.endsWith('/') ? '' : '/';
  let input = fs.readFileSync(path + folder + '/input.txt').toString();
  let part1 = require(path + folder + '/part1.js')(input);
  let part2 = require(path + folder + '/part2.js')(input);

  console.log(`${folder}: [${part1}, ${part2}]`);
  console.timeEnd('Execution');
  console.log();
}

console.time('Total execution');
let path = process.argv[2] || './';
fs.readdirSync(path).filter(f => f.startsWith('day')).forEach(f => processFolder(f, path));
console.timeEnd('Total execution');

