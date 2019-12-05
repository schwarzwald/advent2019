const int = require('./int');

module.exports = input => int(input.split(',').map(Number), [5]).pop();