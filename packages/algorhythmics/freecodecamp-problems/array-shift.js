function shiftArray(arr, n) {
  const solution = [];

  for (let i = 0; i < arr.length; i++) {
    let idx = (i + n) % arr.length;
    if (idx < 0) {
      idx = arr.length + idx;
    }

    solution[i] = arr[idx];
  }

  return solution;
}
