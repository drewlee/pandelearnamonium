function bucketFill(grid, [row, col], newValue) {
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const rowLen = grid.length;
  const colLen = grid[0].length;

  function fillCell([row, col], oldValue, newValue) {
    if (row >= 0 && row < rowLen && col >= 0 && col < colLen && grid[row][col] === oldValue) {
      grid[row][col] = newValue;

      for (const dir of dirs) {
        const nRow = row + dir[0];
        const nCol = col + dir[1];

        fillCell([nRow, nCol], oldValue, newValue);
      }
    }
  }

  fillCell([row, col], grid[row][col], newValue);

  return grid;
}
