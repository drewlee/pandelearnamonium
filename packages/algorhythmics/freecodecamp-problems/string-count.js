function count(text, pattern) {
  let count = 0;

  for (let i = 0; i < text.length - pattern.length + 1; i++) {
    if (text.slice(i, i + pattern.length) === pattern) {
      count++;
    }
  }

  return count;
}
