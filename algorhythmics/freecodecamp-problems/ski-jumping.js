function skiJumpMedal(distancePoints, stylePoints, windComp, kPointBonus) {
  const scores = [180.0, 175.0, 172.0, 170.0, 169.5, 165.5, 162.0, 158.0];
  const medals = ['Gold', 'Silver', 'Bronze'];
  const totalScore = distancePoints + stylePoints + windComp + kPointBonus;

  for (let i = 0; i < medals.length; i++) {
    if (totalScore > scores[i]) {
      return medals[i];
    }
  }

  return 'No Medal';
}
