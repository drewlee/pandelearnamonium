function countLettersAndNumbers(str) {
  let alphaCount = 0;
  let numCount = 0;

  for (const char of str) {
    if (char.match(/[a-z]/i)) {
      alphaCount++;
    } else if (char.match(/[0-9]/)) {
      numCount++;
    }
  }

  const letNoun = alphaCount === 1 ? 'letter' : 'letters';
  const numNoun = numCount === 1 ? 'number' : 'numbers';

  return `The string has ${alphaCount} ${letNoun} and ${numCount} ${numNoun}.`;
}
