/**
 * Determines and returns all the ways the target string can be constructed from the
 * given array of strings.
 * Bottom-up tabulation solution.
 *
 * @remarks
 * Time: O(n^m)
 * Space: O(n^m)
 * Where `m` is the length of the target string and `n` is the length of the word bank array.
 *
 * @param target - Target string.
 * @param wordBank - Candidate strings for constructing the target string.
 * @returns Array of all ways the target string can be constructed.
 */
export default function allConstruct(target: string, wordBank: string[]): string[][] {
  const len = target.length;
  const table = new Array<string[][] | null>(len + 1).fill(null).map(() => new Array<string[]>());
  table[0].push([] as string[]);

  for (let i = 1; i <= len; i++) {
    if (table[i - 1].length === 0) {
      continue;
    }

    const suffix = target.slice(i - 1);

    for (const word of wordBank) {
      if (suffix.startsWith(word)) {
        const current = table[i - 1].map((curr) => [...curr, word]);
        table[i + word.length - 1].push(...current);
      }
    }
  }

  return table[len];
}
