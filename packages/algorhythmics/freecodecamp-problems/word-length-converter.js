function convertWords(str) {
  let result = '';
  let wordStart = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === ' ') {
      result += String(i - wordStart) + ' ';
      wordStart = i + 1;
    }
  }

  result += String(str.length - wordStart);

  return result;
}
