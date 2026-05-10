function transpose(matrix) {
  const nMatrix = new Array(matrix[0].length).fill(null).map(() => new Array(matrix.length));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      nMatrix[j][i] = matrix[i][j];
    }
  }

  return nMatrix;
}
