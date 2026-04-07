function complementaryDNA(strand) {
  const complement = new Map([
    ['A', 'T'],
    ['T', 'A'],
    ['C', 'G'],
    ['G', 'C'],
  ]);

  let result = '';

  for (const letter of strand) {
    result += complement.get(letter);
  }

  return result;
}
