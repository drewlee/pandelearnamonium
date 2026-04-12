function buildMatrix(rows, cols) {
  const result = new Array(rows).fill(null).map(() => new Array(cols).fill(0));

  return result;
}
