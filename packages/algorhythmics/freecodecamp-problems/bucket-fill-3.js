const DIRS = Object.freeze([
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]);

function getColors(grid) {
  const colors = new Set();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      colors.add(grid[i][j]);
    }
  }

  return [...colors];
}

function isFilled(grid, targetColor) {
  const colors = getColors(grid);
  return colors.length === 1 && colors[0] === targetColor;
}

function fillAdjacentCells(row, col, currColor, targetColor, grid) {
  grid[row][col] = targetColor;

  for (const dir of DIRS) {
    const nRow = row + dir[0];
    const nCol = col + dir[1];

    if (
      nRow >= 0 &&
      nRow < grid.length &&
      nCol >= 0 &&
      nCol < grid[nRow].length &&
      grid[nRow][nCol] === currColor
    ) {
      fillAdjacentCells(nRow, nCol, currColor, targetColor, grid);
    }
  }
}

function getFillPerms(row, col, colors, targetColor, grid) {
  if (isFilled(grid, targetColor)) {
    return 0;
  }

  if (col >= grid[0].length) {
    row++;
  }

  if (row >= grid.length) {
    for (const color of colors) {
      if (isFilled(grid, color)) {
        return 1;
      }
    }

    return -1;
  }

  let clicks = Infinity;

  for (let i = row; i < grid.length; i++) {
    for (let j = col; j < grid[i].length; j++) {
      const currColor = grid[i][j];

      if (currColor !== targetColor) {
        for (const color of colors) {
          if (currColor === color) {
            continue;
          }

          const cGrid = structuredClone(grid);
          fillAdjacentCells(i, j, currColor, color, cGrid);

          const currClicks = getFillPerms(i, j + 1, colors, targetColor, cGrid);

          if (currClicks > -1) {
            clicks = Math.min(clicks, currClicks);
          }
        }
      }
    }
  }

  return clicks === Infinity ? -1 : clicks + 1;
}

function bucketFill(grid, targetColor) {
  // Get a list of colors in the grid
  const colors = getColors(grid);

  // Add the target color as an option
  colors.push(targetColor);

  return getFillPerms(0, 0, colors, targetColor, grid);
}
