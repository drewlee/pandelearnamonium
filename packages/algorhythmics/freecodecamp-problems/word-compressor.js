function compress(str) {
  const seen = new Map();
  const words = str.split(' ');

  const solution = words.map((word, i) => {
    if (seen.has(word)) {
      return seen.get(word) + 1;
    }

    seen.set(word, i);
    return word;
  });

  return solution.join(' ');
}
