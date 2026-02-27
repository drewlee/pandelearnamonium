function purgeMostFrequent(arr) {
  // Get a running count of the occurrence of each element.
  const counts = new Map();

  for (const el of arr) {
    const val = counts.has(el) ? counts.get(el) : 0;
    counts.set(el, val + 1);
  }

  // Sort the counts in descending order.
  const sCounts = [...counts].sort((a, b) => b[1] - a[1]);
  const mostFrequent = [];

  // The first set of items will be the most frequent.
  for (let i = 0; i < sCounts.length; i++) {
    // This deals with a tie.
    // The first element is the most frequent.
    // Then check whether the following element(s) are tied.
    if (i === 0 || sCounts[i][1] === sCounts[i - 1][1]) {
      mostFrequent.push(sCounts[i][0]);
    } else {
      break;
    }
  }

  const result = arr.filter((el) => !mostFrequent.includes(el));

  return result;
}
