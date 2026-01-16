/**
 * Sorts the specified array in-place using the `Selection Sort` algorithm.
 * O(n^2) time.
 * O(1) space.
 *
 * @remarks
 * Repeatedly finds the smallest element from the unsorted portion of a list and moves it to its
 * correct position in the sorted portion.
 *
 * @param arr - The array to sort.
 * @returns The sorted array.
 */
export default function selectionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return arr;
}
