function convertParsecs(parsecs) {
  if (parsecs % 2 === 0) {
    return parsecs * 3;
  }
  return parsecs * 2;
}
