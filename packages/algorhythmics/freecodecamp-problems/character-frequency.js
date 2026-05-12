function getFrequency(str) {
  const count = {};

  for (const char of str) {
    if (!(char in count)) {
      count[char] = 0;
    }

    count[char]++;
  }

  return count;
}
