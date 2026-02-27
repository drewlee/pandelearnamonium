function knightMoves(position) {
  const minCol = 'A'.charCodeAt(0);
  const maxCol = 'H'.charCodeAt(0);
  const minRow = 1;
  const maxRow = 8;

  const col = position.charCodeAt(0);
  const row = Number(position[1]);

  let moves = 0;

  // Determinations are made based off of the board's boundaries.
  // While a more DRY solution can be derived, this implementation favors
  // understandability over conciseness.

  // Is there top space for upward horizontal moves?
  if (row + 1 <= maxRow) {
    // Check right space
    if (col + 2 <= maxCol) {
      moves++;
    }

    // Check left space
    if (col - 2 >= minCol) {
      moves++;
    }
  }

  // Is there bottom space for downward horizontal moves?
  if (row - 1 >= minRow) {
    // Check right space
    if (col + 2 <= maxCol) {
      moves++;
    }

    // Check left space
    if (col - 2 >= minCol) {
      moves++;
    }
  }

  // Is there top space for upward vertical moves?
  if (row + 2 <= maxRow) {
    // Check right space
    if (col + 1 <= maxCol) {
      moves++;
    }

    // Check left space
    if (col - 1 >= minCol) {
      moves++;
    }
  }

  // Is there bottom space for downward vertical moves?
  if (row - 2 >= minRow) {
    // Check right space
    if (col + 1 <= maxCol) {
      moves++;
    }

    // Check left space
    if (col - 1 >= minCol) {
      moves++;
    }
  }

  return moves;
}
