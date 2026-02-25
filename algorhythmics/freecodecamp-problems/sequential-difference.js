function findDifferences(arr) {
  const difference = [];

  for (let i = 0; i < arr.length; i++) {
    let diff = 0;

    if (i < arr.length - 1) {
      diff = arr[i + 1] - arr[i];
    }

    difference.push(diff);
  }

  return difference;
}
