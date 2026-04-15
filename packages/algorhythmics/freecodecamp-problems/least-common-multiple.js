function lcm(a, b) {
  const max = Math.max(a, b);
  let i = max;

  while (i % a !== 0 || i % b !== 0) {
    i++;
  }

  return i;
}
