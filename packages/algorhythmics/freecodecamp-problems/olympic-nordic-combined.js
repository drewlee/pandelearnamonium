function calculateStartDelays(jumpScores) {
  const topScore = Math.max(...jumpScores);
  const scores = jumpScores.map((score) => Math.ceil((topScore - score) * 1.5));
  return scores;
}
