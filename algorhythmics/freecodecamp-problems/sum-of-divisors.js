function sumDivisors(n) {
  const divisors = [];

  for (let i = n; i > 0; i--) {
    if (n % i === 0) {
      divisors.push(i);
    }
  }

  const sum = divisors.reduce((currSum, value) => {
    return currSum + value;
  }, 0);

  return sum;
}
