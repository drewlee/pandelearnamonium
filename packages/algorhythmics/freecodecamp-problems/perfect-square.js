function isPerfectSquare(n) {
  if (n < 0) {
    return false;
  }

  const sqrt = Math.round(Math.sqrt(n));
  if (sqrt ** 2 === n) {
    return true;
  }

  return false;
}
