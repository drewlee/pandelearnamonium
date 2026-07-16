function pigLatin(str) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  const words = str.split(' ');

  return words
    .map((word) => {
      const first = word[0];

      if (vowels.has(first.toLowerCase())) {
        return word + 'way';
      } else {
        const isUC = first.toUpperCase() === first;
        let vowelIdx = -1;
        word = word.toLowerCase();

        for (let i = 0; i < word.length; i++) {
          if (vowels.has(word[i].toLowerCase())) {
            vowelIdx = i;
            break;
          }
        }

        let nWord = word.slice(vowelIdx) + word.slice(0, vowelIdx) + 'ay';
        if (isUC) {
          nWord = nWord[0].toUpperCase() + nWord.slice(1);
        }

        return nWord;
      }
    })
    .join(' ');
}
