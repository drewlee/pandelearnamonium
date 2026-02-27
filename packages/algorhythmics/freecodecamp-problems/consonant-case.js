function toConsonantCase(str) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  const alphaRegEx = /[a-z]/i;
  let newStr = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    let newChar = char;

    if (alphaRegEx.test(char)) {
      newChar = vowels.has(char.toLowerCase()) ? char.toLowerCase() : char.toUpperCase();
    } else if (char === '-') {
      newChar = '_';
    }

    newStr += newChar;
  }

  return newStr;
}
