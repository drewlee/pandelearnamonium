/**
 * Returns the Nth number in the Fibonacci sequence.
 * E.g., 1, 1, 2, 3, 5, 8, 13, 21, 29...
 * Bottom-up tabulation solution.
 *
 * @remarks
 * Time: O(n)
 * Space: O(n)
 *
 * @param n - Nth position in the sequence.
 * @returns Number at the Nth position.
 */
export default function fibonacci(n: number): number {
  const table = new Array<number>(n + 1).fill(0);
  table[1] = 1;

  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }

  return table[n];
}
