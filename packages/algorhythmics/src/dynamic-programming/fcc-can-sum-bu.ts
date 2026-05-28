/**
 * Given a target number and an array of values, determines whether
 * any of the values can sum up to the target.
 * Top-down recursive solution.
 *
 * @remarks
 * Time: O(m * n)
 * Space: O(m)
 * Where `m` is the target and `n` is the size of the array.
 *
 * @param target - Target sum.
 * @param values - Numbers to test.
 * @returns Whether the values can sum up to the target number.
 */
export default function canSum(target: number, values: number[]): boolean {
  const table = new Array<boolean>(target + 1).fill(false);
  table[0] = true;

  for (let i = 1; i <= target; i++) {
    for (const value of values) {
      const j = i - value;

      if (j >= 0 && table[j]) {
        table[i] = true;
      }
    }
  }

  return table[target];
}
