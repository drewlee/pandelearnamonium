function normalizeWord(word) {
  word = word.toLowerCase();

  if (!/[a-z]/.test(word[word.length - 1])) {
    word = word.slice(0, word.length - 1);
  }

  return word;
}

function getWords(paragraph) {
  const words = paragraph.split(' ');
  const wordCount = new Map();

  for (const word of words) {
    const normWord = normalizeWord(word);
    const count = wordCount.get(normWord) ?? 0;

    wordCount.set(normWord, count + 1);
  }

  const sortedWords = [...wordCount].sort((a, b) => b[1] - a[1]).map(([key]) => key);

  return sortedWords.slice(0, 3);
}
