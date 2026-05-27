/**
 * Given a target number and an array of values, returns an array of values in one of
 * the ways that sum up to the target number.
 * Top-down recursive solution.
 *
 * @remarks
 * Time: O(n^m), O(m * n) w/memoization
 * Space: O(m)
 * Where `m` is the target and `n` is the size of the array.
 *
 * @param target - Target sum.
 * @param values - Numbers to test.
 * @returns Array of values that sum up to the target or `null` if the sum isn't possible.
 */
export default function howSum(target: number, values: number[]): number[] | null {
  function howSumRec(
    target: number,
    path: number[],
    memo: Map<number, number[] | null>,
  ): number[] | null {
    if (target === 0) {
      return [...path];
    }

    if (target < 0) {
      return null;
    }

    if (memo.has(target)) {
      return memo.get(target)!;
    }

    let result: number[] | null = null;

    for (const value of values) {
      path.push(value);
      result = howSumRec(target - value, path, memo);
      path.pop();

      if (result !== null) {
        break;
      }
    }

    memo.set(target, result);
    return result;
  }

  const memo = new Map<number, number[] | null>();
  return howSumRec(target, [], memo);
}
