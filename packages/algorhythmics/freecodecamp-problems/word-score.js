const BASE_CODE = 'a'.charCodeAt(0);

function getWordScore(word) {
  let score = 0;

  for (const letter of word) {
    const code = letter.toLowerCase().charCodeAt(0);
    const value = code - BASE_CODE + 1;
    score += value;
  }

  return score;
}
