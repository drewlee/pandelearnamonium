const MIN_COL = 'A'.charCodeAt(0);
const MAX_COL = 'H'.charCodeAt(0);
const MIN_ROW = 1;
const MAX_ROW = 8;

function traverse(currCol, currRow, colDir, rowDir, target) {
  if (`${String.fromCharCode(currCol)}${currRow}` === target) {
    return true;
  }

  const nCol = currCol + colDir;
  const nRow = currRow + rowDir;

  if (nCol >= MIN_COL && nCol <= MAX_COL && nRow >= MIN_ROW && nRow <= MAX_ROW) {
    return traverse(nCol, nRow, colDir, rowDir, target);
  }

  return false;
}

function rookBishopAttack(rook, bishop) {
  if (rook[0] === bishop[0] || rook[1] === bishop[1]) {
    return 'rook';
  }

  const currCol = bishop[0].charCodeAt(0);
  const currRow = Number(bishop[1]);

  const isUpLeft = traverse(currCol, currRow, -1, 1, rook);
  const isUpRight = traverse(currCol, currRow, 1, 1, rook);
  const isDownRight = traverse(currCol, currRow, 1, -1, rook);
  const isDownLeft = traverse(currCol, currRow, -1, -1, rook);

  if (isUpLeft || isUpRight || isDownRight || isDownLeft) {
    return 'bishop';
  }

  return 'neither';
}
