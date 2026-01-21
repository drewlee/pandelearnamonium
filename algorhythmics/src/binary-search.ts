/**
 * Finds the index of the specified target value in the given array.
 * O(log n) time.
 * O(1) space.
 *
 * @remarks
 * `Binary Search` is a classic "divide and conquer" algorithm, where the array is iteratively
 * divided into smaller segments using three pointers corresponding to the `start`, `mid`, and `end`
 * indices. It is much more efficient than linear search, but requires the array to be sorted.
 *
 * @param arr - The array to search through.
 * @param target - The value to find.
 * @returns The index of the target element, or `-1` if it isn't found.
 */
export function binarySearch<T>(arr: T[], target: T): number {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    // Determine the middle index of the current array segment.
    // const mid = start + Math.floor((end - start) / 2);
    const mid = Math.floor((start + end) / 2);

    if (target === arr[mid]) {
      // The `mid` pointer contains the target value so return its index.
      return mid;
    } else if (target < arr[mid]) {
      // The target value is in the left half of the array segment.
      // Adjust the `end` pointer to the index preceding the `mid` pointer.
      end = mid - 1;
    } else {
      // The target value is in the right half of the array segment.
      // Adjust the `start` pointer to the index following the `mid` pointer.
      start = mid + 1;
    }
  }

  return -1;
}

/**
 * Recursively finds the index of the specified target value in the given array.
 * O(log n) time.
 * O(1) space.
 *
 * @param arr - The array to search through.
 * @param target - The value to find.
 * @param start - Index corresponding to the start of the array segment.
 * @param end - Index corresponding to the end of the array segment.
 * @returns The index of the target element, or `-1` if it isn't found.
 */
export function binarySearchRecursive<T>(
  arr: T[],
  target: T,
  start = 0,
  end = arr.length - 1,
): number {
  // Base case: an empty array or the start index exceeds the end index.
  if (arr.length === 0 || start > end) {
    return -1;
  }

  // Determine the middle index of the current array segment.
  // const mid = start + Math.floor((end - start) / 2);
  const mid = Math.floor((start + end) / 2);

  if (target === arr[mid]) {
    // The `mid` pointer contains the target value so return its index.
    return mid;
  } else if (target < arr[mid]) {
    // The target value is in the left half of the array segment.
    // Adjust the `end` pointer to the index preceding the `mid` pointer.
    return binarySearchRecursive(arr, target, start, mid - 1);
  } else {
    // The target value is in the right half of the array segment.
    // Adjust the `start` pointer to the index following the `mid` pointer.
    return binarySearchRecursive(arr, target, mid + 1, end);
  }
}
