function findOffender(arr) {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      if (i === 0 || arr[i - 1] <= arr[i + 1]) {
        return i;
      } else {
        return i + 1;
      }
    }
  }

  return -1;
}
