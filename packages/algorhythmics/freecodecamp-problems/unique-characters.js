function allUnique(str) {
  const seen = new Set();

  for (const char of str) {
    if (seen.has(char)) {
      return false;
    }
    seen.add(char);
  }

  return true;
}
