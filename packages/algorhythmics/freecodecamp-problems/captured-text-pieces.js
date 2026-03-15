function getCapturedValue(pieces) {
  const totalValue = 39;
  const values = new Map([
    ['P', 1],
    ['R', 5],
    ['N', 3],
    ['B', 3],
    ['Q', 9],
    ['K', 0],
  ]);
  let kingCaptured = true;
  let sum = 0;

  for (const piece of pieces) {
    if (piece === 'K') {
      kingCaptured = false;
    }
    sum += values.get(piece);
  }

  if (kingCaptured) {
    return 'Checkmate';
  }

  return totalValue - sum;
}
