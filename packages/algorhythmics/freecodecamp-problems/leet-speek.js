function makeLeet(str) {
  const sub = new Map([
    ['a', 4],
    ['e', 3],
    ['g', 9],
    ['i', 1],
    ['l', 1],
    ['o', 0],
    ['s', 5],
    ['t', 7],
  ]);

  let result = '';

  for (const letter of str) {
    result += sub.has(letter) ? sub.get(letter) : letter;
  }

  return result;
}
