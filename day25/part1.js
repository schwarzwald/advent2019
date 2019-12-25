const Computer = require('./int');

const parse = monitor => {
  let rows = monitor.split('\n');

  let directions = [];
  let items = [];

  let idx = rows.indexOf('Doors here lead:');

  while (rows[idx + 1].startsWith('- ')) {
    directions.push(rows[idx + 1].substr(2));
    idx++;
  }

  idx = rows.indexOf('Items here:');

  while (rows[idx + 1].startsWith('- ')) {
    items.push(rows[idx + 1].substr(2));
    idx++;
  }

  return [directions, items];
}

const opposite = dir => {
  switch (dir) {
    case 'north': return 'south';
    case 'south': return 'north';
    case 'east': return 'west';
    case 'west': return 'east';
  }
}

let state = (b, i) => i.join('') + b.join('');

module.exports = (input, verbose) => {
  let comp = new Computer(input.split(',').map(Number), [], [], verbose);
  let forbidden = ['infinite loop', 'molten lava', 'photons', 'giant electromagnet', 'escape pod'];
  let backtrack = [];
  let visited = new Set();
  let inv = [];

  let output = comp.command('inv');

  while (true) {
    let [dir, items] = parse(output);

    if (output.includes('In the next room, a pressure-sensitive floor will verify your identity.')) {
      let entry = dir.find(d => backtrack[backtrack.length - 1] != d);
      output = comp.command(entry);

      if (output.includes('Alert! Droids on this ship are heavier than the detected value!')) {
        visited.add(state(backtrack, inv) + opposite(entry));
      } else if (output.includes('Alert! Droids on this ship are lighter than the detected value!')) {
        for (let item of inv) {
          output = comp.command(`drop ${item}`);
        }

        for (let i = 0; i < 2 ** inv.length; i++) {
          for (let j = 0; j < inv.length; j++) {
            if ((i >> j) & 1) {
              output = comp.command(`take ${inv[j]}`);
            }
          }

          output = comp.command(entry);

          if (output.includes('Alert!')) {
            for (let j = 0; j < inv.length; j++) {
              if ((i >> j) & 1) {
                output = comp.command(`drop ${inv[j]}`);
              }
            }
          } else if (output.includes('Analysis complete!')) {
            return output.match(/Oh, hello! You should be able to get in by typing (\d+) on the keypad at the main airlock/)[1];
          }
        }
      } else {
        backtrack.push(opposite(comm));
        visited.push(state(inv, backtrack));
      }
    }

    for (let item of items) {
      if (!forbidden.includes(item)) {
        inv.push(item);
        output = comp.command(`take ${item}`);
      }
    }

    if (dir.length == 1) {
      let comm = backtrack.pop();
      output = comp.command(comm);
    } else {
      let st = state(backtrack, inv);
      let comm = dir.find(d => !visited.has(st + opposite(d)) && backtrack[backtrack.length - 1] != d);//

      if (comm) {
        backtrack.push(opposite(comm));
      } else {
        comm = backtrack.pop();
      }
      visited.add(state(backtrack, inv));
      output = comp.command(comm);
    }
  }
}