function compare(word, guess) {
  const result = new Array(word.length).fill(null);
  const count = new Map();

  for (const letter of word) {
    const currCount = count.get(letter) ?? 0;
    count.set(letter, currCount + 1);
  }

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];

    if (word[i] !== letter) {
      continue;
    }

    result[i] = '2';

    if (count.get(letter) === 1) {
      count.delete(letter);
      continue;
    }

    count.set(letter, count.get(letter) - 1);
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] !== null) {
      continue;
    }

    const letter = guess[i];

    if (!count.has(letter)) {
      result[i] = '0';
      continue;
    }

    result[i] = '1';

    if (count.get(letter) === 1) {
      count.delete(letter);
      continue;
    }

    count.set(letter, count.get(letter) - 1);
  }

  return result.join('');
}
