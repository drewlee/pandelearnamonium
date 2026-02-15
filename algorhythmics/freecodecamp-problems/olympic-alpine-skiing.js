function getHillRating(drop, distance, type) {
  const steepnessMap = new Map([
    ['Downhill', 1.2],
    ['Slalom', 0.9],
    ['Giant Slalom', 1.0],
  ]);
  const steepness = drop / distance;
  const adjSteepness = steepness * steepnessMap.get(type);

  if (adjSteepness <= 0.1) {
    return 'Green';
  } else if (adjSteepness <= 0.25) {
    return 'Blue';
  }

  return 'Black';
}
