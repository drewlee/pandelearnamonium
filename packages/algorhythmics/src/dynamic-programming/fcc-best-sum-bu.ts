/**
 * Given a target number and an array of values, returns an array of values in the most
 * optimal way that sums up to the target number. Optimal meaning the least amount of
 * values used.
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
export default function bestSum(target: number, values: number[]): number[] | null {
  const table = new Array<number[] | null>(target + 1).fill(null);
  table[0] = [];

  for (let i = 1; i <= target; i++) {
    let best: number[] | null = null;

    for (const value of values) {
      const j = i - value;

      if (j >= 0 && table[j] !== null) {
        const current = [...table[j], value];

        if (best === null || current.length < best.length) {
          best = current;
        }
      }
    }

    table[i] = best;
  }

  return table[target];
}
