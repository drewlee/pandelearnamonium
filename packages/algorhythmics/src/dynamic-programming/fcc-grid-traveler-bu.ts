/**
 * Returns the number of possible travel paths for the given grid. Travel occurs from
 * the top left corner to the bottom right corner.
 * Bottom-up tabulation solution.
 *
 * @remarks
 * Time: O(n * m)
 * Space: O(n * m)
 *
 * @param rows - Number of rows in the grid.
 * @param cols - Number of columns in the grid.
 * @returns Number of possible travel paths.
 */
export default function gridTraveler(rows: number, cols: number): number {
  if (rows === 0 || cols === 0) {
    return 0;
  }

  const table = new Array<number[] | null>(rows)
    .fill(null)
    .map(() => new Array<number>(cols).fill(0));

  // Pre-fill the first row
  for (let i = 0; i < cols; i++) {
    table[0][i] = 1;
  }

  // Pre-fill the first column
  for (let i = 1; i < rows; i++) {
    table[i][0] = 1;
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      table[i][j] = table[i - 1][j] + table[i][j - 1];
    }
  }

  return table[rows - 1][cols - 1];
}
