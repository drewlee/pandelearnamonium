function isLetter(code) {
  const baseCode = 'a'.charCodeAt(0);
  const alphaLen = 26;

  return code >= baseCode && code < baseCode + alphaLen;
}

function getLastLetter(str) {
  let maxCode = '';
  let maxLetter = '';

  for (const char of str) {
    const code = char.toLowerCase().charCodeAt(0);

    if (isLetter(code) && code > maxCode) {
      maxCode = code;
      maxLetter = char;
    }
  }

  return maxLetter;
}
