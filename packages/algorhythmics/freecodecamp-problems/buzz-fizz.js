function isFizzBuzz(sequence) {
  for (let i = 0; i < sequence.length; i++) {
    const digit = i + 1;
    let value = '';

    if (digit % 3 === 0) {
      value += 'Fizz';
    }

    if (digit % 5 === 0) {
      value += 'Buzz';
    }

    value = value || digit;

    if (sequence[i] !== value) {
      return false;
    }
  }

  return true;
}
