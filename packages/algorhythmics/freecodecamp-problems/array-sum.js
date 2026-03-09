function sumArray(numbers) {
  return numbers.reduce((sum, number) => {
    return sum + number;
  }, 0);
}
