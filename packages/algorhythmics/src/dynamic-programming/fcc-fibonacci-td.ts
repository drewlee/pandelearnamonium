/**
 * Returns the Nth number in the Fibonacci sequence.
 * E.g., 1, 1, 2, 3, 5, 8, 13, 21, 29...
 * Top-down recursive solution.
 *
 * @remarks
 * Time: O(2^n), O(n) w/memoization
 * Space: O(n)
 *
 * @param n - Nth position in the sequence.
 * @param memo - Memoization map.
 * @returns Number at the Nth position.
 */
export default function fibonacci(n: number, memo = new Map<number, number>()): number {
  if (n <= 2) {
    return 1;
  }

  if (memo.has(n)) {
    return memo.get(n)!;
  }

  const result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  memo.set(n, result);

  return result;
}
