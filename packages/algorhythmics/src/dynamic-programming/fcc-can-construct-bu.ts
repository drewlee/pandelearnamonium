/**
 * Determines whether the target string can be constructed from the given array of strings.
 * Bottom-up tabulation solution.
 *
 * @remarks
 * Time: O(m^2 * n)
 * Space: O(m)
 * Where `m` is the length of the target string and `n` is the length of the word bank array.
 *
 * @param target - Target string.
 * @param wordBank - Candidate strings for constructing the target string.
 * @returns Whether the target can be constructed from the given array of strings.
 */
export default function canConstruct(target: string, wordBank: string[]): boolean {
  const len = target.length;
  const table = new Array<boolean>(len + 1).fill(false);
  table[0] = true;

  for (let i = 1; i <= len; i++) {
    if (!table[i - 1]) {
      continue;
    }

    const suffix = target.slice(i - 1);

    for (const word of wordBank) {
      if (suffix.startsWith(word)) {
        table[i + word.length - 1] = true;
      }
    }
  }

  return table[target.length];
}
