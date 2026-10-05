/**
 * Valley Bottom
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/binary-search#two-array-two-sum}
 *
 * A valley-shaped array is an array of integers such that:
 * - It can be split into a non-empty prefix and a non-empty suffix,
 * - The prefix is sorted in decreasing order,
 * - The suffix is sorted in increasing order,
 * - All the elements are unique.
 * Given a valley-shaped array, arr, return the smallest value.
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param arr - Array of integers.
 * @returns Smallest value in the input array.
 */
function valleyBottom(arr: number[]): number {
  let left = 0;
  let right = arr.length - 1;
  let bottom = -1;

  function isSatisfied(idx: number): boolean {
    return idx === arr.length - 1 || arr[idx] < arr[idx + 1];
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (isSatisfied(mid)) {
      bottom = arr[mid];
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return bottom;
}

function runTests() {
  const tests: [number[], number][] = [
    // Example 1 from book
    [[6, 5, 4, 7, 9], 4],
    // Example 2 from book
    [[5, 6, 7], 5],
    // Example 3 from book
    [[7, 6, 5], 5],
    // Edge case - 2 elements
    [[2, 1], 1],
    // Edge case - 3 elements
    [[3, 2, 4], 2],
  ];

  for (const [arr, want] of tests) {
    const got = valleyBottom(arr);
    if (got !== want) {
      throw new Error(`\nvalleyBottom(${JSON.stringify(arr)}): got: ${got}, want: ${want}\n`);
    }
  }
}

runTests();
