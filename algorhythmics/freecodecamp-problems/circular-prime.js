function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function isCircularPrime(n) {
  const nStr = String(n);
  let rotated = '';

  while (rotated !== nStr) {
    if (!rotated) {
      rotated = nStr;
    }

    if (!isPrime(Number(rotated))) {
      return false;
    }

    rotated = rotated.slice(1) + rotated[0];
  }

  return true;
}
