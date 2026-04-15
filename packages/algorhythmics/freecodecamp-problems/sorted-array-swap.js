function sortAndSwap(arr) {
  const solution = [];
  arr.sort((a, b) => a - b);

  for (let i = 0; i < arr.length; i++) {
    if (i > 0 && i % 3 === 0) {
      solution[i - 1] = arr[i];
      solution[i] = arr[i - 1];
      continue;
    }

    solution[i] = arr[i];
  }

  return solution;
}
