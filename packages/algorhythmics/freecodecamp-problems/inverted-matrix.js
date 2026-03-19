function invertMatrix(matrix) {
  const values = [null, null];

  // Determine the two values
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (values[0] === null) {
        values[0] = matrix[i][j];
      } else if (values[1] === null && values[0] !== matrix[i][j]) {
        values[1] = matrix[i][j];
        break;
      }
    }

    if (values[0] !== null && values[1] !== null) {
      break;
    }
  }

  // Invert each value
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = matrix[i][j] === values[0] ? values[1] : values[0];
    }
  }

  return matrix;
}
