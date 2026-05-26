function sumOfDifferences(arr) {
  let result = 0;

  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    result += diff;
  }

  return result;
}
