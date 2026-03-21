function parseRomanNumeral(numeral) {
  const symbols = new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
  ]);
  const lastIndex = numeral.length - 1;
  let result = 0;

  for (let i = lastIndex; i >= 0; i--) {
    const digit = symbols.get(numeral[i]);

    if (i < lastIndex && digit < symbols.get(numeral[i + 1])) {
      result -= digit;
    } else {
      result += digit;
    }
  }

  return result;
}
