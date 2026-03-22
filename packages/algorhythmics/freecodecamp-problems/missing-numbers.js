function findMissingNumbers(arr) {
  const missing = [];
  arr.sort((a, b) => a - b);

  for (let i = 1; i < arr.length; i++) {
    for (let j = arr[i - 1] + 1; j < arr[i]; j++) {
      missing.push(j);
    }
  }

  return missing;
}
