/**
 * Sorts the specified array in-place using the `Bubble Sort` algorithm.
 * O(n^2) time.
 * O(1) space.
 *
 * @remarks
 * `Bubble Sort` is the simplest sorting algorithm to implement. It works by continously comparing
 * two adjacent elements in the array and swapping their values so that the smaller value precedes
 * the larger one.
 *
 * @param arr - The array to sort.
 * @returns The sorted array.
 */
export default function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    // With each iteration, the largest unsorted value is moved to the end of the list in its
    // correct index position. As such, these indices aren't necessary to check, so with each
    // subsequent run, the iterations are reduce by 1.
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
