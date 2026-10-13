/**
 * Longest Good Day Streak
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/sliding-windows#longest-good-day-streak}
 *
 * Given an array, `sales`, where `sales[i]` is the number of sales on the i-th day,
 * find the most consecutive days with no bad days.
 *
 * A bad day is a day with fewer than 10 sales.
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param sales - Number of sales per day.
 * @returns The most consecutive days with no bad days.
 */
function maxNoBadDays(sales: number[]): number {
  let left = 0;
  let right = 0;
  let maxDays = 0;

  while (right < sales.length) {
    if (sales[right] >= 10) {
      right++;
      maxDays = Math.max(maxDays, right - left);
    } else {
      right++;
      left = right;
    }
  }

  return maxDays;
}

function runTests() {
  const tests: [number[], number][] = [
    // Example from the book
    [[0, 14, 7, 12, 10, 20], 3],
    // Edge case - empty array
    [[], 0],
    // Edge case - all good days
    [[10, 11, 12], 3],
    // Edge case - all bad days
    [[1, 2, 3], 0],
    // alternating
    [[10, 5, 10, 5], 1],
  ];
  for (const [sales, want] of tests) {
    const got = maxNoBadDays(sales);
    if (got !== want) {
      throw new Error(`\nmaxNoBadDays(${JSON.stringify(sales)}): got: ${got}, want ${want}\n`);
    }
  }
}

runTests();
