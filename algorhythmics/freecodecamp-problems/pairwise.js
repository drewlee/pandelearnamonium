function pairwise(arr, arg) {
  const seen = new Map();
  const pairs = [];

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    const complement = arg - value;

    if (seen.has(complement)) {
      const indexes = seen.get(complement);
      pairs.push(indexes[0], i);
      indexes.shift();

      if (indexes.length) {
        seen.set(complement, indexes);
      } else {
        seen.delete(complement);
      }
    } else {
      const indexes = seen.has(value) ? seen.get(value) : [];

      indexes.push(i);
      seen.set(value, indexes);
    }
  }

  const sum = pairs.reduce((sum, value) => sum + value, 0);

  return sum;
}

pairwise([1, 4, 2, 3, 0, 5], 7);
