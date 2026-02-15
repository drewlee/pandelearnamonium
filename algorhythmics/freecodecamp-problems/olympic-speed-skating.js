function largestDifference(skater1, skater2) {
  let largest = -Infinity;
  let largestIdx = -1;

  for (let i = 0; i < skater1.length; i++) {
    const diff = Math.abs(skater1[i] - skater2[i]);
    if (diff > largest) {
      largest = diff;
      largestIdx = i;
    }
  }

  return largestIdx + 1;
}
