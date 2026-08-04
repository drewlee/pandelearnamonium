function calculateHandicap(scores, pars) {
  const diffs = scores.map((score, i) => score - pars[i]);
  const sum = diffs.reduce((sum, score) => sum + score);

  return Number((sum / scores.length).toFixed(1));
}
