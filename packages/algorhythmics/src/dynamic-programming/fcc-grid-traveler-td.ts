/**
 * Returns the number of possible travel paths for the given grid. Travel occurs from
 * the top left corner to the bottom right corner.
 * Top-down recursive solution.
 *
 * @remarks
 * Time: O(2^(n + m)), O(m * n) w/memoization
 * Space: O(n + m)
 *
 * @param rows - Number of rows in the grid.
 * @param cols - Number of columns in the grid.
 * @param memo - Memoization map.
 * @returns Number of possible travel paths.
 */
export default function gridTraveler(
  rows: number,
  cols: number,
  memo = new Map<string, number>(),
): number {
  if (rows === 0 || cols === 0) {
    return 0;
  }

  if (rows === 1 && cols === 1) {
    return 1;
  }

  const key = `${Math.max(rows, cols)},${Math.min(rows, cols)}`;
  if (memo.has(key)) {
    return memo.get(key)!;
  }

  const result =
    gridTraveler(rows - 1, cols, memo) + gridTraveler(rows, cols - 1, memo);
  memo.set(key, result);

  return result;
}
