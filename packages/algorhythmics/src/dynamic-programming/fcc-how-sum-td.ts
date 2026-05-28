/**
 * Given a target number and an array of values, returns an array of values in one of
 * the ways that sum up to the target number.
 * Top-down recursive solution.
 *
 * @remarks
 * Time: O(n^m * m), O(m^2 * n) w/memoization
 * Space: O(m), O(m^2) w/memoization
 * Where `m` is the target and `n` is the size of the array.
 *
 * @param target - Target sum.
 * @param values - Numbers to test.
 * @param memo - Memoization map.
 * @returns Array of values that sum up to the target or `null` if the sum isn't possible.
 */
export default function howSum(
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

  let combined: number[] | null = null;

  for (const value of values) {
    const result = howSum(target - value, values, memo);

    if (result !== null) {
      combined = [value, ...result];
      break;
    }
  }

  memo.set(target, combined);
  return combined;
}
