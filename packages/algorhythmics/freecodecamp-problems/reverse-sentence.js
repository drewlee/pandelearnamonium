function reverseStr(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

function reverseSentence(sentence) {
  // Solution not using built-in array methods.
  // 1. Reverse the entire sentece.
  const revSentence = reverseStr(sentence);

  // 2. Reverse each word in the string.
  let revWords = '';
  let boundary = 0;

  for (let i = 0; i < revSentence.length; i++) {
    if (revSentence[i] === ' ' && boundary < i) {
      const word = revSentence.slice(boundary, i);
      revWords += reverseStr(word) + ' ';

      boundary = i;
      // Advance the boundary past all space characters.
      while (revSentence[boundary] === ' ') {
        boundary++;
      }
    }
  }

  // 3. Reverse and append the last word.
  revWords += reverseStr(revSentence.slice(boundary));
  return revWords;
}
