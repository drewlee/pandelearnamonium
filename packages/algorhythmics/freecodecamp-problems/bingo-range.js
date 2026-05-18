function getBingoRange(letter) {
  const ranges = new Map([
    ['B', [1, 15]],
    ['I', [16, 30]],
    ['N', [31, 45]],
    ['G', [46, 60]],
    ['O', [61, 75]],
  ]);

  const result = [];
  const [start, end] = ranges.get(letter);

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}
