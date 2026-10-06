/**
 * Search in Huge Array
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/binary-search#search-in-huge-array}
 *
 * We are trying to search for a target integer, target, in a sorted array of positive
 * integers (duplicates allowed) that is too big to fit into memory. We can only access
 * the array through an API, `fetch(i)`, which returns the value at index `i` if `i` is
 * within bounds or -1 otherwise.
 *
 * Using as few calls to the API as possible, return the index of the target, or -1 if
 * it does not exist. If the target appears multiple times, return any of the indices.
 *
 * There is no API to get the array's length.
 * Note: The array is 0-indexed and all elements in the array are positive.
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param target - Target value to find.
 * @param fetch - Function to get the value at the specified index.
 * @returns Index of the target value.
 */
function findThroughApi(target: number, fetch: (ids: number) => number): number {
  let left = 0;
  let right = 1;
  let boundary = -1;

  function isSatisfied(idx: number): boolean {
    const value = fetch(idx);
    return value > -1 && value < target;
  }

  // Exponential growth to find the array's upper bounds
  while (isSatisfied(right)) {
    right *= 2;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (isSatisfied(mid)) {
      left = mid + 1;
    } else {
      if (fetch(mid) === target) {
        boundary = mid;
      }
      right = mid - 1;
    }
  }

  return boundary;
}

function runTests() {
  function makeFetchFunction(secretArray: number[]) {
    return function fetch(idx: number) {
      if (idx >= secretArray.length || idx < 0) {
        return -1;
      }
      return secretArray[idx];
    };
  }

  const tests: [number, number, number[]][] = [
    // Example 1 - target exists
    [5, 2, [1, 3, 5, 7, 9]],
    // Example 2 - target doesn't exist
    [6, -1, [1, 3, 5, 7, 9]],
    // Edge case - target at start
    [1, 0, [1, 3, 5, 7, 9]],
    // Edge case - target at end
    [9, 4, [1, 3, 5, 7, 9]],
    // All duplicates
    [1, 0, [1, 1, 1, 1, 1, 1, 1, 1]],
    // Ensure we don't go out of bounds
    [10, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
  ];

  for (const [target, want, secretArray] of tests) {
    const fetch = makeFetchFunction(secretArray);
    const got = findThroughApi(target, fetch);
    if (got !== want) {
      throw new Error(`findThroughApi(${target}): got ${got}, want ${want}`);
    }
  }
}

runTests();
