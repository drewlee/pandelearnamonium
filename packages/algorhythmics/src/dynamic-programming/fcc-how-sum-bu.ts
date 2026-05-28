/**
 * Given a target number and an array of values, returns an array of values in one of
 * the ways that sum up to the target number.
 * Bottom-up tabulation solution.
 *
 * @remarks
 * Time: O(m^2 * n)
 * Space: O(m^2)
 * Where `m` is the target and `n` is the size of the array.
 *
 * @param target - Target sum.
 * @param values - Numbers to test.
 * @returns Array of values that sum up to the target or `null` if the sum isn't possible.
 */
export default function howSum(target: number, values: number[]): number[] | null {
  const table = new Array<number[] | null>(target + 1).fill(null);
  table[0] = [];

  for (let i = 1; i <= target; i++) {
    for (const value of values) {
      const j = i - value;

      if (j >= 0 && table[j] !== null) {
        table[i] = [...table[j], value];
      }
    }
  }

  return table[target];
}
