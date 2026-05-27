/**
 * Given a target number and an array of values, determines whether
 * any of the values can sum up to the target.
 * Top-down recursive solution.
 *
 * @remarks
 * Time: O(n^m), O(m * n) w/memoization
 * Space: O(m)
 * Where `m` is the target and `n` is the size of the array.
 *
 * @param target - Target sum.
 * @param values - Numbers to test.
 * @param memo - Memoization map.
 * @returns Whether the values can sum up to the target number.
 */
export default function canSum(
  target: number,
  values: number[],
  memo = new Map<number, boolean>(),
): boolean {
  if (target < 0) {
    return false;
  }

  if (target === 0) {
    return true;
  }

  if (memo.has(target)) {
    return memo.get(target)!;
  }

  let result = false;

  for (const value of values) {
    if (canSum(target - value, values, memo)) {
      result = true;
    }
  }

  memo.set(target, result);
  return result;
}
