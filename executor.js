const fs = require('fs');
const processor = require('./'+process.argv[2]);
const input = process.argv[3];

fs.readFile(input, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  console.time("execution");
  console.log(processor(data));
  console.timeEnd("execution");
});