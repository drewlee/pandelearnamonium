const primeMemo = [null];

function isPrime(num) {
  if (num === 2) {
    return true;
  }

  if (num % 2 === 0) {
    return false;
  }

  const sqrt = Math.floor(Math.sqrt(num));

  for (let i = sqrt; i > 2; i--) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

function nthPrime(n) {
  if (primeMemo[n] !== undefined) {
    return primeMemo[n];
  }

  let digit = primeMemo[primeMemo.length - 1] ?? 1;

  while (n !== primeMemo.length - 1) {
    digit++;
    if (isPrime(digit)) {
      primeMemo.push(digit);
    }
  }
  console.log(primeMemo);
  return primeMemo[n];
}
