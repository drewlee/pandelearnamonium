function isPrime(n) {
  if (n > 0 && n <= 3) {
    return true;
  }

  if (n % 2 === 0) {
    return false;
  }

  const limit = Math.floor(Math.sqrt(n));

  for (let i = 3; i <= limit; i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function primeFactorization(n) {
  if (isPrime(n)) {
    return [n];
  }

  const limit = Math.floor(Math.sqrt(n));

  for (let i = 2; i <= limit; i++) {
    if (n % i === 0) {
      return [i, ...primeFactorization(n / i)];
    }
  }

  return [];
}
