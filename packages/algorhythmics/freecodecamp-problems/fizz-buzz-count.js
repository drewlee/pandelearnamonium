function fizzBuzzCount(start, end) {
  const count = {
    fizz: 0,
    buzz: 0,
  };

  for (let i = start; i <= end; i++) {
    if (i % 3 === 0) {
      count.fizz++;
    }

    if (i % 5 === 0) {
      count.buzz++;
    }
  }

  return count;
}
