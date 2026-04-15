function getNextLocation(matrix) {
  let currRow = -1;
  let currCol = -1;
  let prevRow = -1;
  let prevCol = -1;
  let nextRow = -1;
  let nextCol = -1;

  // Find existing coordinates
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 1) {
        prevRow = row;
        prevCol = col;
      }

      if (matrix[row][col] === 2) {
        currRow = row;
        currCol = col;
      }
    }
  }

  // Horizontal travel
  if (currRow === prevRow) {
    nextRow = currRow;

    // Traveling left
    if (prevCol < currCol && currCol + 1 < matrix[currRow].length) {
      nextCol = currCol + 1;
      // Traveling right
    } else if (prevCol > currCol && currCol > 0) {
      nextCol = currCol - 1;
      // Hitting a wall
    } else {
      nextCol = prevCol;
    }
  }

  // Vertical travel
  if (currCol === prevCol) {
    nextCol = currCol;

    // Traveling down
    if (prevRow < currRow && currRow + 1 < matrix.length) {
      nextRow = currRow + 1;
      // Traveling up
    } else if (prevRow > currRow && currRow > 0) {
      nextRow = currRow - 1;
      // Hitting a wall
    } else {
      nextRow = prevRow;
    }
  }

  // Top-left diagonal: [-1, -1]
  if (prevRow > currRow && prevCol > currCol) {
    nextRow = prevRow;
    nextCol = prevCol;

    if (currRow > 0) {
      nextRow = currRow - 1;
    }

    if (currCol > 0) {
      nextCol = currCol - 1;
    }
  }

  // Top-right diagonal: [-1, 1]
  if (prevRow > currRow && prevCol < currCol) {
    nextRow = prevRow;
    nextCol = prevCol;

    if (currRow > 0) {
      nextRow = currRow - 1;
    }

    if (currCol + 1 < matrix[currRow].length) {
      nextCol = currCol + 1;
    }
  }

  // Bottom-right diagonal: [1, 1]
  if (prevRow < currRow && prevCol < currCol) {
    nextRow = prevRow;
    nextCol = prevCol;

    if (currRow + 1 < matrix.length) {
      nextRow = currRow + 1;
    }

    if (currCol + 1 < matrix[currRow].length) {
      nextCol = currCol + 1;
    }
  }

  // Bottom-left diagonal: [1, -1]
  if (prevRow < currRow && prevCol > currCol) {
    nextRow = prevRow;
    nextCol = prevCol;

    if (currRow + 1 < matrix.length) {
      nextRow = currRow + 1;
    }

    if (currCol > 0) {
      nextCol = currCol - 1;
    }
  }

  return [nextRow, nextCol];
}
