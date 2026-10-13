/**
 * Given a non-empty array arr of integers (which can be negative), find the non-empty
 * subarray with the maximum sum and return its sum.
 *
 * Kadane's Algorithm
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param arr - Array of integers.
 * @returns The maximum subarray sum.
 */
function maxSubarraySum(arr: number[]): number {
  let sum = 0;
  let best = -Infinity;

  for (const num of arr) {
    sum = Math.max(num, sum + num);
    best = Math.max(best, sum);
  }

  return best;
}

function runTests() {
  const tests: [number[], number][] = [
    // Example 1 from the book
    [[1, 2, 3, -2, 1], 6],
    // Example 2 from the book
    [[1, 2, 3, -2, 7], 11],
    // Example 3 from the book
    [[1, 2, 3, -8, 7], 7],
    // Example 4 from the book
    [[-2, -3, -4], -2],
    // Edge case - single element
    [[5], 5],
    // Edge case - all positive
    [[1, 2, 3], 6],
  ];
  for (const [arr, want] of tests) {
    const got = maxSubarraySum(arr);
    if (got !== want) {
      throw new Error(`\nmaxSubarraySum(${JSON.stringify(arr)}): got: ${got}, want ${want}\n`);
    }
  }
}

runTests();
