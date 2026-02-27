// Time: O(n * m) - The rows and columns in the matrix.
// Space: O(n * m) - Create a new results array.
function shiftMatrix(matrix, shift) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = new Array(rows).fill(null).map(() => new Array(cols));

  // Virtual length is the total number of items in the matrix
  const virtualLen = rows * cols;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Use a virtual index to determine shifted position
      const virtualIdx = i * cols + j;

      // Module to compute wrap around values
      let shIdx = (virtualIdx + shift) % virtualLen;
      if (shIdx < 0) {
        shIdx = virtualLen + shIdx;
      }

      // Decode the i and j coordinates from the shifted position
      const iSh = Math.floor(shIdx / cols);
      const jSh = shIdx % cols;

      result[iSh][jSh] = matrix[i][j];
    }
  }

  return result;
}
