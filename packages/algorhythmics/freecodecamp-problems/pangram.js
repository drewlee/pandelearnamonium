function isPangram(sentence, letters) {
  const bank = new Map();

  for (const letter of letters) {
    bank.set(letter, 0);
  }

  for (let char of sentence) {
    if (!/[a-z]/i.test(char)) {
      continue;
    }

    char = char.toLowerCase();

    if (!bank.has(char)) {
      return false;
    }

    bank.set(char, bank.get(char) + 1);
  }

  for (const [_, value] of bank) {
    if (value === 0) {
      return false;
    }
  }

  return true;
}
