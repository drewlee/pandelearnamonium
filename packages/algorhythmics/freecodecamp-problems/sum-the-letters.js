function sumLetters(str) {
  const minCode = 'A'.charCodeAt(0);
  const maxCode = 'Z'.charCodeAt(0);
  let sum = 0;

  for (let char of str) {
    char = char.toUpperCase();
    const code = char.charCodeAt(0);

    if (code >= minCode && code <= maxCode) {
      sum += code - minCode + 1;
    }
  }

  return sum;
}
