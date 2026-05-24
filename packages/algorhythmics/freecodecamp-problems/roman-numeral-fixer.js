const romanToDigit = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
]);

const digitToRoman = new Map([
  [1, 'I'],
  [5, 'V'],
  [10, 'X'],
  [50, 'L'],
  [100, 'C'],
  [500, 'D'],
  [1000, 'M'],
]);

function numToRoman(value) {
  let roman = '';
  let multiplier = 1;

  while (value > 0) {
    const digit = value % 10;
    const lSymb = digitToRoman.get(multiplier);
    const hSymb = digitToRoman.get(multiplier * 5);

    if (digit >= 9) {
      const nSymb = digitToRoman.get(multiplier * 10);
      roman = lSymb.repeat(10 - digit) + nSymb + roman;
    } else if (digit >= 5) {
      roman = hSymb + lSymb.repeat(digit - 5) + roman;
    } else if (digit >= 4) {
      roman = lSymb + hSymb + roman;
    } else if (digit >= 1) {
      roman = lSymb.repeat(digit) + roman;
    }

    value = (value - digit) / 10;
    multiplier *= 10;
  }

  return roman;
}

function fixNumerals(str) {
  let value = 0;
  for (const symb of str) {
    value += romanToDigit.get(symb);
  }

  return numToRoman(value);
}
