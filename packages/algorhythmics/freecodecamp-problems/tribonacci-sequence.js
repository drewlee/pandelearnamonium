function tribonacciSequence(startSequence, length) {
  if (length === 0) {
    return [];
  }

  if (length <= startSequence.length) {
    return startSequence.slice(0, length);
  }

  for (let i = startSequence.length; i < length; i++) {
    startSequence[i] = startSequence[i - 1] + startSequence[i - 2] + startSequence[i - 3];
  }

  return startSequence;
}
