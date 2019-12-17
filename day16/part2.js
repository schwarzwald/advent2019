class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

const skip = (chain, n) => {
  while (n-- && chain) {
    chain = chain.next;
  }
  return chain;
}

const add = (chain, pos) => {
  let skipping = true;
  let mul = 1;
  let res = 0;
  let i = 0;

  while (chain) {
    if (skipping) {
      chain = skip(chain, pos + 1);
      skipping = false;
    } else {
      res += mul * chain.value;
      i++;
      chain = chain.next;

      if (i == pos + 1) {
        mul *= -1;
        skipping = true;
        i = 0;
      }
    }

  }

  return Math.abs(res % 10);
}

const phase = chain => {
  let curr = chain;

  let pos = 0;
  let newChain = null;
  let start = null;
  while (curr) {
    curr = curr.next;

    if (!newChain) {
      newChain = new Node(add(chain, pos));
      start = newChain;
    } else if (curr) {
      start.next = new Node(add(chain, pos));
      start = start.next;
    }
    pos++;
  }
  return newChain;
}

const toString = chain => {
  let res = '';
  while (chain) {
    res += chain.value;
    chain = chain.next;
  }
  return res;
}

module.exports = input => {
  x = '12345678';
  input = x;

  for (let i = 0; i < 20; i++) {
    let chain = new Node(0);
    let start = chain;
    x.split('').forEach(v => {
      start.next = new Node(+v);
      start = start.next;
    });
    x += input;


    for (let i = 0; i < 100; i++) {
      chain = new Node(0, phase(chain));
    }
    console.log(toString(chain.next));
  }

  //return str //.substr(0, 8); //phase('12345678', 0, 8); //phase('03036732577212944063491565474664', 303673, 8);
}