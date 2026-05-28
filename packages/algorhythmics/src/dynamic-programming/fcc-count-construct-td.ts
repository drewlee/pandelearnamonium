/**
 * Determines the number of ways the target string can be constructed from the
 * given array of strings.
 *
 * @remarks
 * Time: O(n^m * m), O(n * m^2) w/memoization
 * Space: O(m^2)
 * Where `m` is the length of the target string and `n` is the length of the word bank array.
 *
 * @param target - Target string.
 * @param wordBank - Candidate strings for constructing the target string.
 * @param memo - Memoization map.
 * @returns Number of ways the target string can be constructed.
 */
export default function countConstruct(
  target: string,
  wordBank: string[],
  memo = new Map<string, number>(),
): number {
  if (target === '') {
    return 1;
  }

  if (memo.has(target)) {
    return memo.get(target)!;
  }

  let result = 0;

  for (const prefix of wordBank) {
    if (target.startsWith(prefix)) {
      const suffix = target.slice(prefix.length);
      result += countConstruct(suffix, wordBank, memo);
    }
  }

  memo.set(target, result);
  return result;
}
