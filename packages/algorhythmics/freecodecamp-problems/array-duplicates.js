function findDuplicates(arr) {
  const seen = new Set();
  const dupes = new Set();

  for (const num of arr) {
    if (seen.has(num)) {
      dupes.add(num);
    } else {
      seen.add(num);
    }
  }

  return [...dupes].sort((a, b) => a - b);
}
