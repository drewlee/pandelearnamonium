function passingCount(scores, passingScore) {
  let count = 0;
  for (const score of scores) {
    if (score >= passingScore) {
      count++;
    }
  }
  return count;
}
