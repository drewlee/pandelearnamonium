function squaresWithThree(n) {
  let count = 0;

  for (let i = 1; i <= n; i++) {
    const square = i ** 2;
    if (String(square).includes('3')) {
      count++;
    }
  }

  return count;
}
