function nthFibonacci(n) {
  const seq = [null, 0, 1];

  for (let i = 3; i <= n; i++) {
    const value = seq[i - 2] + seq[i - 1];
    seq.push(value);
  }

  return seq[n];
}
