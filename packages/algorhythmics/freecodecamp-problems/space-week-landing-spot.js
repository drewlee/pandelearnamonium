const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function getDangerLevel(matrix, row, col) {
  let total = 0;

  for (const [x, y] of DIRS) {
    const nRow = row + x;
    const nCol = col + y;

    if (nRow >= 0 && nRow < matrix.length && nCol >= 0 && nCol < matrix[row].length) {
      total += matrix[nRow][nCol];
    }
  }

  return total;
}

function findLandingSpot(matrix) {
  let minRow = -1;
  let minCol = -1;
  let minDanger = Infinity;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const value = matrix[i][j];

      if (value === 0) {
        const danger = getDangerLevel(matrix, i, j);

        if (danger < minDanger) {
          minRow = i;
          minCol = j;
          minDanger = danger;
        }
      }
    }
  }

  return [minRow, minCol];
}
