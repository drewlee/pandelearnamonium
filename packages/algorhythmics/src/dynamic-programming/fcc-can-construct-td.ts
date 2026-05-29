/**
 * Determines whether the target string can be constructed from the given array of strings.
 * Top-down recursive solution.
 *
 * @remarks
 * Time: O(n^m * m), O(n * m^2) w/memoization
 * Space: O(m^2)
 * Where `m` is the length of the target string and `n` is the length of the word bank array.
 *
 * @param target - Target string.
 * @param wordBank - Candidate strings for constructing the target string.
 * @param memo - Memoization map.
 * @returns Whether the target can be constructed from the given array of strings.
 */
export default function canConstruct(
  target: string,
  wordBank: string[],
  memo = new Map<string, boolean>(),
): boolean {
  if (target === '') {
    return true;
  }

  if (memo.has(target)) {
    return memo.get(target)!;
  }

  let result = false;

  for (const prefix of wordBank) {
    if (target.startsWith(prefix)) {
      const suffix = target.slice(prefix.length);

      if (canConstruct(suffix, wordBank, memo)) {
        result = true;
        break;
      }
    }
  }

  memo.set(target, result);
  return result;
}
