const BASE_CODE = 'a'.charCodeAt(0);
const ALPHA_LEN = 26;

function longestWord(sentence) {
  const words = sentence.split(' ');
  let maxWord = '';

  for (const word of words) {
    let nWord = '';

    for (const char of word) {
      const code = char.toLowerCase().charCodeAt(0);

      if (code >= BASE_CODE && code < BASE_CODE + ALPHA_LEN) {
        nWord += char;
      }
    }

    if (nWord.length > maxWord.length) {
      maxWord = nWord;
    }
  }

  return maxWord;
}
