function bucketFill(grid, targetColor) {
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  function fillAdjacent(row, col, currColor) {
    grid[row][col] = targetColor;

    for (const dir of dirs) {
      const nRow = row + dir[0];
      const nCol = col + dir[1];

      if (
        nRow >= 0 &&
        nRow < grid.length &&
        nCol >= 0 &&
        nCol < grid[0].length &&
        grid[nRow][nCol] === currColor
      ) {
        fillAdjacent(nRow, nCol, currColor);
      }
    }
  }

  let clicks = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== targetColor) {
        fillAdjacent(i, j, grid[i][j]);
        clicks++;
      }
    }
  }

  return clicks;
}
