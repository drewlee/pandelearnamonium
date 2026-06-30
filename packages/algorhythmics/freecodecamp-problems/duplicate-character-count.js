function duplicateCharacterCount(str1, str2) {
  const letters = new Set(str1.split(''));
  let count = 0;

  for (const letter of str2) {
    if (letters.has(letter)) {
      count++;
    }
  }

  return count;
}
