function parseBold(markdown) {
  // Half-ass solution
  const words = markdown.split(' ');
  const fWord = words[0];
  const lWord = words[words.length - 1];

  // If the entire input should be replaced
  if (fWord.length > 2 && lWord.length > 2) {
    if (
      (fWord.slice(0, 2) === '**' && lWord.slice(lWord.length - 2) === '**') ||
      (fWord.slice(0, 2) === '__' && lWord.slice(lWord.length - 2) === '__')
    ) {
      const repFWord = '<b>' + fWord.slice(2);
      const repLWord = lWord.slice(0, lWord.length - 2) + '</b>';
      const result = [repFWord, ...words.slice(1, words.length - 1), repLWord].join(' ');

      return result;
    }
  }

  // Only specific words need to be replace
  const result = words
    .map((word) => {
      if (
        word.length > 2 &&
        ((word.slice(0, 2) === '**' && word.slice(word.length - 2) === '**') ||
          (word.slice(0, 2) === '__' && word.slice(word.length - 2) === '__'))
      ) {
        return '<b>' + word.slice(2, word.length - 2) + '</b>';
      }

      return word;
    })
    .join(' ');

  return result;
}
