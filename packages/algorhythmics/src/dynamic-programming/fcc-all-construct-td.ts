/**
 * Determines and returns all the ways the target string can be constructed from the
 * given array of strings.
 * Top-down recursive solution.
 *
 * @remarks
 * Time: O(n^m)
 * Space: O(m)
 * Where `m` is the length of the target string and `n` is the length of the word bank array.
 *
 * @param target - Target string.
 * @param wordBank - Candidate strings for constructing the target string.
 * @param memo - Memoization map.
 * @returns Array of all ways the target string can be constructed.
 */
export default function allConstruct(
  target: string,
  wordBank: string[],
  memo = new Map<string, string[][]>(),
): string[][] {
  if (target === '') {
    return [[]];
  }

  if (memo.has(target)) {
    return memo.get(target)!;
  }

  const merged: string[][] = [];

  for (const prefix of wordBank) {
    if (target.startsWith(prefix)) {
      const suffix = target.slice(prefix.length);
      const results = allConstruct(suffix, wordBank, memo);

      for (const result of results) {
        merged.push([prefix, ...result]);
      }
    }
  }

  memo.set(target, merged);
  return merged;
}
