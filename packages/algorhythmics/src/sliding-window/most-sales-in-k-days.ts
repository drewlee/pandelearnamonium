/**
 * Most Sales in k Days
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/sliding-windows#most-sales-in-k-days}
 *
 * Given the array `sales` and a number `k` with `1 ≤ k ≤ sales.length`, find the most
 * sales in any k-day period.
 *
 * Return the first day of that period (days start at 0). If there are multiple k-day
 * periods with the most sales, return the first day of the first one.
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param sales - An array of sales.
 * @param k - Number of days.
 * @returns The first day (index) in the k-day period with most sales.
 */
function mostSalesInKDays(sales: number[], k: number): number {
  let left = 0;
  let right = 0;
  let windowSum = 0;
  let maxSum = 0;
  let maxIndex = -1;

  while (right < sales.length) {
    windowSum += sales[right];
    right++;

    const windowSize = right - left;

    if (windowSize === k) {
      if (windowSum > maxSum) {
        maxSum = windowSum;
        maxIndex = left;
      }

      windowSum -= sales[left];
      left++;
    }
  }

  return maxIndex;
}

function runTests() {
  const tests: [number[], number, number][] = [
    // Example from the book
    [[8, 1, 3, 7], 2, 2],
    // Edge case - k=1
    [[5, 10, 15, 5], 1, 2],
    // Edge case - k=len(sales)
    [[1, 2, 3], 3, 0],
    // Edge case - multiple valid answers, return first
    [[10, 5, 10], 2, 0],
  ];
  for (const [sales, k, want] of tests) {
    const got = mostSalesInKDays(sales, k);
    if (got !== want) {
      throw new Error(
        `\nmostSalesInKDays(${JSON.stringify(sales)}, ${k}): got: ${got}, want ${want}\n`,
      );
    }
  }
}

runTests();
