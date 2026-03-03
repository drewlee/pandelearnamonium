function countPerfectCubes(a, b) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  let count = 0;

  for (let i = min; i <= max; i++) {
    const root = Math.round(Math.cbrt(i));
    if (root ** 3 === i) {
      count++;
    }
  }

  return count;
}
