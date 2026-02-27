/**
 * Sorts the specified array in-place using the `Insertion Sort` algorithm.
 * O(n) best case time. O(n^2) worst case.
 * O(1) space.
 *
 * @remarks
 * Builds the sorted list one element at a time, similarly to sorting a hand of playing cards.
 * Most efficient on small datasets or data that is close to sorted, approaching O(n) performance.
 *
 * @param arr - The array to sort.
 * @returns The sorted array.
 */
export function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}

/**
 * An alternate implementation where a series of swaps is used in lieu of a "key" element.
 *
 * @param arr - The array to sort.
 * @returns The sorted array.
 */
export function insertionSortVariation(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;

    while (j >= 0 && arr[j] > arr[j + 1]) {
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      j--;
    }
  }

  return arr;
}
