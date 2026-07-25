function findSignal(grid) {
  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  const rowLen = grid.length;
  const colLen = grid[0].length;
  const nGrid = new Array(rowLen).fill(null).map(() => new Array(colLen).fill(0));

  let max = 0;
  let result = [-1, -1];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const value = grid[i][j];

      if (value === 0) {
        continue;
      }

      for (const [row, col] of dirs) {
        const nRow = row * value + i;
        const nCol = col * value + j;

        if (nRow >= 0 && nRow < rowLen && nCol >= 0 && nCol < colLen && grid[nRow][nCol] === 0) {
          const nValue = nGrid[nRow][nCol] + 1;

          if (nValue > max) {
            max = nValue;
            result = [nRow, nCol];
          }

          nGrid[nRow][nCol] = nValue;
        }
      }
    }
  }

  return result;
}
