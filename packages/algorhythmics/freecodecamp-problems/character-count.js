function countCharacters(sentence) {
  const count = new Map();

  for (const char of sentence) {
    if (/[a-z]/i.test(char)) {
      const lcChar = char.toLowerCase();
      const value = count.get(lcChar) ?? 0;

      count.set(lcChar, value + 1);
    }
  }

  const result = [...count].map(([char, count]) => `${char} ${count}`);

  return result.sort();
}
