/**
 * Sorts the specified array in-place using the `Bubble Sort` algorithm.
 * O(n^2) time.
 * O(1) space.
 *
 * @remarks
 * `Bubble Sort` is the simplest sorting algorithm to implement. It works by continuously comparing
 * two adjacent elements in the array and swapping their values so that the smaller value precedes
 * the larger.
 *
 * @param arr - The array to sort.
 * @returns The sorted array.
 */
export function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    // With each iteration, the largest unsorted value is moved toward the end of the list.
    // As such, the end indices aren't necessary to check and are reduced by 1.
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Is the current value larger than the right adjacent element's value?
      if (arr[j] > arr[j + 1]) {
        // If so, swap them so that the smaller value precedes the larger value.
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

/**
 * Alternatively, the inner iteration can be rewritten to start from
 * the second index, while comparing its value with the preceding element.
 *
 * @param arr - The array to sort.
 * @returns The sorted array.
 */
export function bubbleSortVariation(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      }
    }
  }

  return arr;
}
