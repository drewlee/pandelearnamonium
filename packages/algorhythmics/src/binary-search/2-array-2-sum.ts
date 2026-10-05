/**
 * 2-Array 2-Sum
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/binary-search#two-array-two-sum}
 *
 * You are given two non-empty arrays of integers, `sortedArr` and `unsortedArr`. The
 * first one is sorted, but the second is not. The goal is to find one element from each
 * array with sum 0. If you can find them, return an array with their indices, starting
 * with the element in `sortedArr`. Otherwise, return [-1, -1]. Use O(1) extra space and
 * do not modify the input.
 *
 * Time: O(m * log n)
 * Space: O(1)
 *
 * @param sortedArr - Sorted array of integers.
 * @param unsortedArr - Unsorted array of integers.
 * @returns Indices from each array that sum to 0.
 */
function twoArrayTwoSum(sortedArr: number[], unsortedArr: number[]): [number, number] {
  function binarySearch(target: number): number {
    let left = 0;
    let right = sortedArr.length - 1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);

      if (sortedArr[mid] === target) {
        return mid;
      } else if (sortedArr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return -1;
  }

  for (let i = 0; i < unsortedArr.length; i++) {
    const num = unsortedArr[i];
    const complement = num * -1;
    const compIdx = binarySearch(complement);

    if (compIdx > -1) {
      return [compIdx, i];
    }
  }

  return [-1, -1];
}

function runTests() {
  const tests = [
    // Example from book
    [
      [-5, -4, -1, 4, 6, 6, 7],
      [-3, 7, 18, 4, 6],
      [1, 3],
    ],
    // no solution
    [
      [1, 2, 3],
      [1, 2, 3],
      [-1, -1],
    ],
    [[1], [-1], [0, 0]],
    [
      [1, 2],
      [-2, -1],
      [1, 0],
    ],
    [
      [0, 1, 2, 3],
      [3, 2, 1, 0],
      [0, 3],
    ],
  ];

  for (const [sortedArr, unsortedArr, want] of tests) {
    const got = twoArrayTwoSum(sortedArr, unsortedArr);
    if (JSON.stringify(got) !== JSON.stringify(want)) {
      throw new Error(
        `\ntwoArrayTwoSum(${JSON.stringify(sortedArr)}, ${JSON.stringify(unsortedArr)}): got: ${JSON.stringify(got)}, want: ${JSON.stringify(want)}\n`,
      );
    }
  }
}

runTests();
