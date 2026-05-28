/**
 * Given a target number and an array of values, returns an array of values in the most
 * optimal way that sums up to the target number. Optimal meaning the least amount of
 * values used.
 * Top-down recursive solution.
 *
 * @remarks
 * Time: O(n^m * m), O(m^2 * n) w/memoization
 * Space: O(m^2)
 * Where `m` is the target and `n` is the size of the array.
 *
 * @param target - Target sum.
 * @param values - Numbers to test.
 * @returns Array of values that sum up to the target or `null` if the sum isn't possible.
 */
export default function bestSum(
  target: number,
  values: number[],
  memo = new Map<number, number[] | null>(),
): number[] | null {
  if (target === 0) {
    return [];
  }

  if (target < 0) {
    return null;
  }

  if (memo.has(target)) {
    return memo.get(target)!;
  }

  let best: number[] | null = null;

  for (const value of values) {
    const result = bestSum(target - value, values, memo);
    if (result === null) {
      continue;
    }

    const combined = [...result, value];
    if (best === null || combined.length < best.length) {
      best = combined;
    }
  }

  memo.set(target, best);
  return best;
}
