function scoreCurling(house) {
  // Used to calculate distance from the center point.
  const mid = Math.floor(house.length / 2);

  // Keep track of stones in each concentric ring by distance
  // from the center point. Index 0 is closest to center.
  const count = new Array(mid + 1).fill(null).map(() => ({ R: 0, Y: 0 }));

  // Iterate through each cell in the matrix.
  for (let row = 0; row < house.length; row++) {
    for (let col = 0; col < house[row].length; col++) {
      const value = house[row][col];

      if (value !== '.') {
        const rowDepth = Math.abs(row - mid);
        const colDepth = Math.abs(col - mid);
        const distance = Math.max(rowDepth, colDepth);

        count[distance][value]++;
      }
    }
  }

  // Store the winning team and their score.
  const winner = [null, 0];

  // Check the number of stones in each concentric ring.
  for (let i = 0; i < count.length; i++) {
    const hasRed = count[i]['R'] > 0;
    const hasYel = count[i]['Y'] > 0;

    // Can't have stones of opposing types within the same ring,
    // or a stone in an outer ring from the opposing team.
    if ((hasRed && hasYel) || (winner[0] === 'R' && hasYel) || (winner[0] === 'Y' && hasRed)) {
      break;
    }

    if (hasRed) {
      winner[0] = 'R';
      winner[1] += count[i]['R'];
    }

    if (hasYel) {
      winner[0] = 'Y';
      winner[1] += count[i]['Y'];
    }
  }

  if (winner[0] !== null) {
    return `${winner[0]}: ${winner[1]}`;
  }

  return 'No points awarded';
}
