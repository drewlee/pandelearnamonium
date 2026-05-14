const pairs = new Map([
  ['[', ']'],
  [']', '['],
  ['{', '}'],
  ['}', '{'],
  ['<', '>'],
  ['>', '<'],
  ['b', 'd'],
  ['d', 'b'],
  ['p', 'q'],
  ['q', 'p'],
  ['(', ')'],
  [')', '('],
]);

function isMirrorImage(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const n = str1.length;

  for (let l = 0; l < n; l++) {
    const r = n - l - 1;
    const char = str1[l];
    const mChar = pairs.has(char) ? pairs.get(char) : char;

    if (mChar !== str2[r]) {
      return false;
    }
  }

  return true;
}
