const Computer = require('./int2');

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

  perms([5, 6, 7, 8, 9], perm => {
    let computers = [];
    let output = [perm[0], 0];

    for (let i = 0; i < 5; i++) {
      let inp = i == 0 ? output : computers[i - 1].output();
      let out = i == 4 ? output : [perm[(i + 1) % 5]];

      computers.push(new Computer(instructions, inp, out));
    }

    while (true) {
      if (computers.map(c => c.run()).every(c => c)) {
        break;
      }
    }

    max = Math.max(max, output.pop());
  });

  return max;
}
