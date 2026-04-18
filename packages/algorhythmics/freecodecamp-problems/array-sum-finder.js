function dfs(sum, index, arr, path, target) {
  if (sum === target) {
    return [...path];
  }

  for (let i = index + 1; i < arr.length; i++) {
    path.push(arr[i]);
    const result = dfs(sum + arr[i], i, arr, path, target);
    path.pop();

    if (result !== null) {
      return result;
    }
  }

  return null;
}

function findSum(arr, target) {
  const solution = dfs(0, -1, arr, [], target);
  return solution ?? 'Sum not found';
}
