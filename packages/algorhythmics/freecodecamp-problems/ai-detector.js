function detectAI(text) {
  const words = text.split(' ');
  let dashes = 0;
  let parens = 0;
  let longWords = 0;

  for (const word of words) {
    let wLength = 0;

    for (const char of word) {
      if (char === '-') {
        dashes++;
      }

      if (char === '(' || char === ')') {
        parens++;
      }

      if (/[a-z]/i.test(char)) {
        wLength++;
      }
    }

    if (wLength >= 7) {
      longWords++;
    }
  }

  if (dashes >= 2 || parens >= 4 || longWords >= 3) {
    return 'AI';
  }

  return 'Human';
}
