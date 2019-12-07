const int = require('./int');

const perms = (arr, consumer, perm) => {
  perm = perm || [];

  if (arr.length == 0) {
    consumer(perm);
  }

  for (let i = 0; i < arr.length; i++) {
    if (perm.indexOf(arr[i]) == - 1) {
      let permCopy = perm.slice();
      let arrCopy = arr.slice();
      permCopy.push(arr[i]);
      arrCopy.splice(i, 1)
      perms(arrCopy, consumer, permCopy);
    }
  }
}

module.exports = input => {
  let instructions = input.split(',').map(Number);
  let max = 0;

  perms([0, 1, 2, 3, 4], perm => {
    let param = 0;
    for (seq of perm) {
      param = int(instructions.slice(), [seq, param])[0];
      max = Math.max(max, param || 0);
    }
  });

  return max;
}
