function gcd(x, y) {
  const max = Math.max(x, y);
  let solution = 1;

  for (let i = max; i > 1; i--) {
    if (x % i === 0 && y % i === 0) {
      solution = i;
      break;
    }
  }

  return solution;
}
