function rotate(matrix) {
  const rotated = new Array(matrix.length)
    .fill(null)
    .map(() => new Array(matrix[0].length).fill(null));

  for (let i = 0; i < matrix.length; i++) {
    const len = matrix[i].length;

    for (let j = 0; j < len; j++) {
      rotated[i][j] = matrix[len - j - 1][i];
    }
  }

  return rotated;
}
