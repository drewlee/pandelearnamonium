function computeScore(judgeScores, ...penalties) {
  let max = -Infinity;
  let min = Infinity;
  let sum = 0;

  for (const score of judgeScores) {
    if (score > max) {
      max = score;
    }
    if (score < min) {
      min = score;
    }
    sum += score;
  }

  sum = sum - max - min;

  const totalPenalties = penalties.reduce((sum, value) => sum + value, 0);

  return sum - totalPenalties;
}
