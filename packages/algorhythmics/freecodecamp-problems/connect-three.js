function connectThree(matrix) {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  const matchLen = 3;
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  function traverse(value, position, dir, path) {
    if (path.length === matchLen) {
      return path;
    }

    const [row, col] = position;

    if (row >= 0 && row < rowLen && col >= 0 && col < colLen && matrix[row][col] === value) {
      const nRow = row + dir[0];
      const nCol = col + dir[1];
      path.push(position);

      return traverse(value, [nRow, nCol], dir, path);
    }

    return [];
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const value = matrix[row][col];

      if (value === '') {
        continue;
      }

      for (const dir of dirs) {
        const position = [row + dir[0], col + dir[1]];
        const results = traverse(value, position, dir, [[row, col]]);

        if (results.length) {
          return [value, ...results];
        }
      }
    }
  }

  return [];
}
