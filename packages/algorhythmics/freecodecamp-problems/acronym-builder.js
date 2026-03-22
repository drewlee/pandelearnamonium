function buildAcronym(str) {
  const ignoreWords = new Set(['a', 'for', 'an', 'and', 'by', 'of']);
  let result = '';

  const words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (i === 0 || !ignoreWords.has(word.toLowerCase())) {
      result += word[0].toUpperCase();
    }
  }

  return result;
}
