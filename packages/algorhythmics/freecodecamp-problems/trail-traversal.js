const WALK_DIRS = [
  [0, 1, 'R'],
  [1, 0, 'D'],
  [0, -1, 'L'],
  [-1, 0, 'U'],
];

function recursiveWalk(map, toCell, fromCell, dir) {
  const [row, col] = toCell;

  // Base cases:
  // - Row is out of bounds
  if (row < 0 || row >= map.length) {
    return '';
  }

  // - Col is out of bounds
  if (col < 0 || col >= map[row].length) {
    return '';
  }

  const value = map[row][col];

  // - Wall boundary
  if (value === '-') {
    return '';
  }

  // - Goal found
  if (value === 'G') {
    return dir;
  }

  // Traverse the next set of cells
  for (let i = 0; i < WALK_DIRS.length; i++) {
    const [walkRow, walkCol, walkDir] = WALK_DIRS[i];
    const [fromRow, fromCol] = fromCell;
    const nextRow = row + walkRow;
    const nextCol = col + walkCol;

    // Omit the cell we came from
    if (nextRow === fromRow && nextCol === fromCol) {
      continue;
    }

    const path = recursiveWalk(map, [nextRow, nextCol], [row, col], walkDir);

    if (path.length) {
      return dir + path;
    }
  }

  return '';
}

function navigateTrail(map) {
  let row = null;
  let col = null;

  // Find start cell coordinates
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 'C') {
        row = i;
        col = j;
        break;
      }
    }
  }

  if (row === null || col === null) {
    return '';
  }

  return recursiveWalk(map, [row, col], [-1, -1], '');
}
