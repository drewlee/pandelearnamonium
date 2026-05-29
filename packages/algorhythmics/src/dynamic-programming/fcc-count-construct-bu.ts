/**
 * Determines the number of ways the target string can be constructed from the
 * given array of strings.
 * Bottom-up tabulation solution.
 *
 * @remarks
 * Time: O(m^2 * n)
 * Space: O(m)
 * Where `m` is the length of the target string and `n` is the length of the word bank array.
 *
 * @param target - Target string.
 * @param wordBank - Candidate strings for constructing the target string.
 * @returns Number of ways the target string can be constructed.
 */
export default function countConstruct(target: string, wordBank: string[]): number {
  const len = target.length;
  const table = new Array<number>(len + 1).fill(0);
  table[0] = 1;

  for (let i = 1; i <= len; i++) {
    if (table[i - 1] === 0) {
      continue;
    }

    const suffix = target.slice(i - 1);

    for (const word of wordBank) {
      if (suffix.startsWith(word)) {
        table[i + word.length - 1] += table[i - 1];
      }
    }
  }

  return table[target.length];
}
