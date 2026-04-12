const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function spiralMatrix(matrix) {
  const result = [];

  let top = 0;
  let right = matrix[0].length - 1;
  let bottom = matrix.length - 1;
  let left = 0;

  let row = 0;
  let col = 0;
  let dir = 0;

  while (top <= bottom && left <= right) {
    result.push(matrix[row][col]);

    if (dir === 0 && col === right) {
      dir = 1;
      top++;
    } else if (dir === 1 && row === bottom) {
      dir = 2;
      right--;
    } else if (dir === 2 && col === left) {
      dir = 3;
      bottom--;
    } else if (dir === 3 && row === top) {
      dir = 0;
      left++;
    }

    row += DIRS[dir][0];
    col += DIRS[dir][1];
  }

  return result;
}
