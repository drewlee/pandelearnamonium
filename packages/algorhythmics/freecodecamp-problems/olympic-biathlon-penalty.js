function calculatePenaltyDistance(rounds) {
  const target = 5;
  const penalty = 150;
  let penalties = 0;

  for (const round of rounds) {
    const diff = target - round;
    penalties += diff * penalty;
  }

  return penalties;
}
