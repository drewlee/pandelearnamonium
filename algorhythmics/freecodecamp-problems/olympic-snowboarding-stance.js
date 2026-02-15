function getLandingStance(startStance, rotation) {
  rotation = Math.abs(rotation);
  const rotations = Math.floor(rotation / 180);

  // An even number of 180deg rotations
  // leads back to the original stance
  if (rotations % 2 === 0) {
    return startStance;
  }

  // An odd number of rotations requires
  // the stance to be flipped
  const result = startStance === 'Regular' ? 'Goofy' : 'Regular';
  return result;
}
