function isIntegerHypotenuse(a, b) {
  const sum = a * a + b * b;
  const sqrt = Math.sqrt(sum);

  return Number.isInteger(sqrt);
}
