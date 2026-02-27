function findLeftHandedSeats(table) {
  // Right-handed person cannot sit to the left of a left-handed person
  // How many seats can a left-handed person sit at?
  // - Only care about unoccupied seats "U"
  // - In the top row, left & right are reversed
  let count = 0;

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      const value = table[i][j];

      if (
        value === 'U' &&
        ((i === 0 && (j === table[i].length - 1 || table[i][j + 1] !== 'R')) ||
          (i === 1 && (j === 0 || table[i][j - 1] !== 'R')))
      ) {
        count++;
      }
    }
  }

  return count;
}
