function getLongestWord(sentence) {
  let words = sentence.split(' ');
  let maxIndex = 0;

  words = words.map((word) => word.replace('.', ''));

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > words[maxIndex].length) {
      maxIndex = i;
    }
  }

  return words[maxIndex];
}
