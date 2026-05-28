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
  const table = new Array<number[] | null>(rows + 1)
    .fill(null)
    .map(() => new Array<number>(cols + 1).fill(0));

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      table[i][j] = i === 1 && j === 1 ? 1 : table[i - 1][j] + table[i][j - 1];
    }
  }

  return table[rows][cols];
}
