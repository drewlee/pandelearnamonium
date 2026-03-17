function isUnnaturalPrime(n) {
  const nAbs = Math.abs(n);

  if (nAbs <= 1) {
    return false;
  }

  if (nAbs % 2 === 0) {
    return false;
  }

  const sqrt = Math.floor(Math.sqrt(nAbs));

  for (let i = sqrt; i > 1; i--) {
    if (nAbs % i === 0) {
      return false;
    }
  }

  return true;
}
