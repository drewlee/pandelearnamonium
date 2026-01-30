function findPawnMoves(position) {
  const col = position[0];
  const row = Number(position[1]);
  const nextPos = `${col}${row + 1}`;
  const result = [nextPos];

  if (row === 2) {
    result.push(`${col}${row + 2}`);
  }

  return result;
}
