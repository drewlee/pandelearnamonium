function getDifficulty(track) {
  let score = 0;

  // Calculate the score for the first curve
  if (track[0] === 'L' || track[0] === 'R') {
    score += 5;
  }

  // Calculate curve score by comparing to prev curve
  for (let i = 1; i < track.length; i++) {
    const prev = track[i - 1];
    const curr = track[i];

    if (curr === 'S') {
      continue;
    }

    if (prev !== 'S' && prev !== curr) {
      score += 15;
    } else {
      score += 5;
    }
  }

  if (score <= 100) {
    return 'Easy';
  } else if (score <= 200) {
    return 'Medium';
  }

  return 'Hard';
}
