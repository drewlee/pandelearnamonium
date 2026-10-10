/**
 * Given an array, `sales`, find the most sales in any 7-day period.
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param sales - An array of sales.
 * @returns The most sales in a 7-day period.
 */
function mostWeeklySales(sales: number[]): number {
  let left = 0;
  let right = 0;
  let windowSum = 0;
  let maxSum = 0;

  while (right < sales.length) {
    windowSum += sales[right];
    right++;

    const windowSize = right - left;

    if (windowSize === 7) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= sales[left];
      left++;
    }
  }

  return maxSum;
}

function runTests() {
  const tests: [number[], number][] = [
    // Example 1 from the book
    [[0, 3, 7, 12, 10, 5, 0, 1, 0, 15, 12, 11, 1], 44],
    // Example 2 from the book
    [[0, 3, 7, 12], 0],
    // Edge case - empty array
    [[], 0],
    // Edge case - exactly 7 days
    [[1, 2, 3, 4, 5, 6, 7], 28],
    // Edge case - all zeros
    [[0, 0, 0, 0, 0, 0, 0, 0], 0],
  ];
  for (const [sales, want] of tests) {
    const got = mostWeeklySales(sales);
    if (got !== want) {
      throw new Error(`\nmostWeeklySales(${JSON.stringify(sales)}): got: ${got}, want: ${want}\n`);
    }
  }
}

runTests();
