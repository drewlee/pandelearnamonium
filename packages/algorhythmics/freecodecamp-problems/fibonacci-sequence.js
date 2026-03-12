function fibonacciSequence(startSequence, length) {
  if (length <= 1) {
    return startSequence.slice(0, length);
  }

  const result = [...startSequence];

  for (let i = 2; i < length; i++) {
    result[i] = result[i - 2] + result[i - 1];
  }

  return result;
}
