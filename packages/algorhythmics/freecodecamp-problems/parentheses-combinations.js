function getCombinations(n) {
  function gpc(openCount, closeCount, path) {
    if (openCount === 0 && closeCount === 0) {
      return 1;
    }

    let res1 = 0;
    let res2 = 0;

    if (openCount > 0) {
      path.push('(');
      res1 = gpc(openCount - 1, closeCount, path);
      path.pop();
    }

    if (openCount < closeCount) {
      path.push(')');
      res2 = gpc(openCount, closeCount - 1, path);
      path.pop();
    }

    return res1 + res2;
  }

  return gpc(n, n, []);
}
