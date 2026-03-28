function pascalRow(n) {
  const result = new Array(n).fill(null);

  for (let i = 0; i < n; i++) {
    result[i] = new Array(i + 1);

    for (let j = 0; j < result[i].length; j++) {
      if (j === 0 || j === result[i].length - 1) {
        result[i][j] = 1;
      } else {
        result[i][j] = result[i - 1][j - 1] + result[i - 1][j];
      }
    }
  }

  return result[n - 1];
}
