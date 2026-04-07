const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function dive(map, coordinates) {
  const [row, col] = coordinates;
  const val = map[row][col];

  if (val === 'O' || val === 'X') {
    for (const [x, y] of DIRS) {
      const nRow = row + x;
      const nCol = col + y;

      if (nRow < 0 || nRow >= map.length) {
        continue;
      }

      if (nCol < 0 || nCol >= map[nRow].length) {
        continue;
      }

      if (map[nRow][nCol] === 'O') {
        return 'Found';
      }
    }

    return 'Recovered';
  }

  return 'Empty';
}
