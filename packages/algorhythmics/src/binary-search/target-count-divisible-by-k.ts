/**
 * Target Count Divisible By K
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/binary-search#target-count-divisible-by-k}
 *
 * Given a sorted array of integers, `arr`, a target value, `target`, and a positive
 * integer, `k`, return whether the number of occurrences of the target in the array is
 * a multiple of `k`.
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param arr - Array of integers.
 * @param target - Target value to find.
 * @param k - Value to check if multiple of.
 * @returns Whether the number of occurrences of the target in the array is a multiple of `k`.
 */
function targetCountDivisibleByK(arr: number[], target: number, k: number): boolean {
  let left = 0;
  let right = arr.length - 1;
  let leftBoundary = -1;
  let rightBoundary = -1;

  // Find the left-most index of target
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] >= target) {
      if (arr[mid] === target) {
        leftBoundary = mid;
      }
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  left = 0;
  right = arr.length - 1;

  // Find the right-most index of target
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] <= target) {
      if (arr[mid] === target) {
        rightBoundary = mid;
      }
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (leftBoundary === -1 && rightBoundary === -1) {
    return true;
  }

  const count = rightBoundary - leftBoundary + 1;

  return count % k === 0;
}

function runTests() {
  const tests: [number[], number, number, boolean][] = [
    // Example 1
    [[1, 2, 2, 2, 2, 2, 2, 3], 2, 3, true],
    // Example 2
    [[1, 2, 2, 2, 2, 2, 2, 3], 2, 4, false],
    // Example 3: 0 occurrences, 0 is multiple of any number
    [[1, 2, 2, 2, 2, 2, 2, 3], 4, 3, true],
    // Example 4
    [[1, 1, 2, 2, 2], 1, 3, false],
    // single occurrence, at the start
    [[1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 1, 1, true],
    [[1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 1, 2, false],
    // single occurrence, at the end
    [[1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 19, 1, true],
    [[1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 19, 2, false],
    // single occurrence, in the middle
    [[1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 9, 1, true],
    [[1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 9, 2, false],
    // smaller than any elements
    [[1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 0, 1, true],
    [[1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 0, 2, true],
    // larger than any elements
    [[1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 20, 1, true],
    [[1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 20, 2, true],
    // Edge case - every occurrence is target
    [[5, 5, 5, 5, 5], 5, 5, true],
    [[5, 5, 5, 5, 5], 5, 3, false],
  ];

  for (const [arr, target, k, want] of tests) {
    const got = targetCountDivisibleByK(arr, target, k);
    if (got !== want) {
      throw new Error(
        `\ntargetCountDivisibleByK(${JSON.stringify(arr)}, ${target}, ${k}): got: ${got}, want: ${want}\n`,
      );
    }
  }
}

runTests();
