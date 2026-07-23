function playGame(p1, p2) {
  let p1Score = 0;
  let p2Score = 0;

  for (let i = 0; i < p1.length; i++) {
    if (p1[i] === 'C' && p2[i] === 'C') {
      p1Score += 3;
      p2Score += 3;
    } else if (p1[i] === 'D' && p2[i] === 'D') {
      p1Score += 1;
      p2Score += 1;
    } else if (p1[i] === 'C' && p2[i] === 'D') {
      p2Score += 5;
    } else {
      p1Score += 5;
    }
  }

  return [p1Score, p2Score];
}
