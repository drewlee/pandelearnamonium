function recursiveCount(n, memo) {
  // The number of recs is calculated as n + (n - 1)
  if (n === 1) {
    return 1;
  }

  if (memo.has(n)) {
    return memo.get(n);
  }

  const result = n + recursiveCount(n - 1, memo);
  memo.set(n, result);

  return result;
}

function countRectangles(width, height) {
  const memo = new Map();
  const widthCount = recursiveCount(width, memo);
  const heightCount = recursiveCount(height, memo);

  return widthCount * heightCount;
}
