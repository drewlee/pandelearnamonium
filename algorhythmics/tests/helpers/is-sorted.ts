/**
 * Test helper to determine whether the given array of numbers is sorted.
 *
 * @param arr - The array to test.
 * @returns `True` if the array is sorted, otherwise `false`.
 */
export default function isSorted(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }

  return true;
}
