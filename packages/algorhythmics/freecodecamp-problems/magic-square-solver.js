function solveMagicSquare(grid) {
  const len = grid.length;
  let prevSum = 0;
  let missingSum = 0;

  // Horizontal scan
  for (let i = 0; i < len; i++) {
    let currSum = 0;
    let isMissingRow = false;

    for (let j = 0; j < len; j++) {
      const value = grid[i][j];

      if (value === 0) {
        isMissingRow = true;
        continue;
      }

      currSum += value;
    }

    if (prevSum > 0 && !isMissingRow && prevSum !== currSum) {
      return 'impossible';
    }

    if (!isMissingRow) {
      prevSum = currSum;
    }
  }

  // Vertical scan
  for (let i = 0; i < len; i++) {
    let currSum = 0;
    let isMissingCol = false;

    for (let j = 0; j < len; j++) {
      const value = grid[j][i];

      if (value === 0) {
        isMissingCol = true;
        continue;
      }

      currSum += value;
    }

    if (prevSum > 0 && !isMissingCol && prevSum !== currSum) {
      return 'impossible';
    }

    if (isMissingCol) {
      missingSum = currSum;
    } else {
      prevSum = currSum;
    }
  }

  return prevSum - missingSum;
}
