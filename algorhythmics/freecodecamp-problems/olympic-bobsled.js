function checkEligibility(athleteWeights, sledWeight) {
  const len = athleteWeights.length;

  if (
    (len === 1 && sledWeight < 162) ||
    (len === 2 && sledWeight < 170) ||
    (len === 4 && sledWeight < 210)
  ) {
    return 'Not Eligible';
  }

  let totalWeight = athleteWeights.reduce((sum, wt) => sum + wt, 0);
  totalWeight += sledWeight;

  if (
    (len === 1 && totalWeight > 247) ||
    (len === 2 && totalWeight > 390) ||
    (len === 4 && totalWeight > 630)
  ) {
    return 'Not Eligible';
  }

  return 'Eligible';
}
