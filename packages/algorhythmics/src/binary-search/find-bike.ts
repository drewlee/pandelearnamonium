/**
 * CCTV Footage
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/binary-search#cctv-footage}
 *
 * You are given an API called `isStolen(t)` which takes a timestamp as input and
 * returns `true` if the bike is missing at that timestamp and `false` if it is still
 * there. You're also given two timestamps, `t1` and `t2`, representing when you parked
 * the bike and when you found it missing. Return the timestamp when the bike was first
 * missing, minimizing the number of API calls. Assume that `0 < t1 < t2`, `isStolen(t1)`
 * is `false`, and `isStolen(t2)` is true.
 *
 * @param t1 - Beginning timestamp when the bike is visible.
 * @param t2 - Ending timestamp when the bike is missing.
 * @param isStolen - Determines whether the bike is missing at the given timestamp.
 * @returns The timestamp when the bike is first missing.
 */
function findBike(t1: number, t2: number, isStolen: (t: number) => boolean): number {
  let left = t1;
  let right = t2;
  let boundary = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (isStolen(mid)) {
      boundary = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return boundary;
}

function runTests() {
  const tests: [number, number, (t: number) => boolean, number][] = [
    // Example 1 - stolen at t=5
    [1, 10, (t) => t >= 5, 5],
    // Example 2 - stolen at start
    [1, 5, (t) => t >= 2, 2],
    // Example 3 - stolen at end
    [1, 5, (t) => t >= 5, 5],
    // Edge case - two timestamps
    [5, 6, (t) => t >= 6, 6],
  ];

  for (const [t1, t2, isStolen, want] of tests) {
    const got = findBike(t1, t2, isStolen);
    if (got !== want) {
      throw new Error(`\nfindBike(${t1}, ${t2}): got: ${got}, want: ${want}\n`);
    }
  }
}

runTests();
