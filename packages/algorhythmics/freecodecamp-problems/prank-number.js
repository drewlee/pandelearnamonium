function fixPrankNumber(arr) {
  // Get a count of the ratios between each value.
  const diffMap = new Map();

  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    const val = diffMap.get(diff) ?? 0;

    diffMap.set(diff, val + 1);
  }

  // Only two ratios indicates that either the first
  // number or the last number of the array is invalid.
  if (diffMap.size === 2) {
    const diffMapArr = [...diffMap];

    // Is the first value invalid?
    if (diffMapArr[0][1] === 1) {
      // Get the valid ratio between values.
      const diff = diffMapArr[1][0];

      // Then apply it.
      arr[0] = arr[1] - diff;

      return arr;
    }
  }

  // Get the valid ratio between values.
  let diff = 0;

  for (const [key, count] of diffMap) {
    if (count > 1) {
      diff = key;
      break;
    }
  }

  // Traverse the array and fix the invalid value.
  for (let i = 1; i < arr.length; i++) {
    const expected = arr[i - 1] + diff;

    if (arr[i] !== expected) {
      arr[i] = expected;
    }
  }

  return arr;
}
