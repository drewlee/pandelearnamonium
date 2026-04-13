function isLetter(char) {
  const baseCode = 'a'.charCodeAt(0);
  const alphaLen = 26;
  const code = char.toLowerCase().charCodeAt(0);

  return code >= baseCode && code < baseCode + alphaLen;
}

function count(str) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  const solution = [0, 0];

  for (const char of str) {
    if (isLetter(char)) {
      if (vowels.has(char)) {
        solution[0]++;
      } else {
        solution[1]++;
      }
    }
  }

  return solution;
}
