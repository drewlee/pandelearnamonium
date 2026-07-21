function blendWords(word1, word2) {
  const word1Idx = Math.floor(word1.length / 2);
  const word2Idx = Math.floor(word2.length / 2);
  const firstHalf = word1.slice(0, word1Idx);
  const secondHalf = word2.slice(word2Idx);

  return firstHalf + secondHalf;
}
