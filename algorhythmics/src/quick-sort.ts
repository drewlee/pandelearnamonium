/**
 * Sorts the specified array in-place using the `Quick Sort` algorithm.
 * O(n log n) time.
 * O(n log n) space.
 *
 * @remarks
 * `Quick Sort` is an efficient in-place sorting algorithm that iteratively divides the array into a
 * "less than" and "greater than" sub-array, based on a comparison to a pivot element.
 *
 * @param arr - The array to sort.
 * @param start - The starting index position of the array segment to sort.
 * @param end - The ending index position of the array segment to sort.
 */
export default function quickSort(arr: number[], start = 0, end = arr.length - 1): void {
  // Base case: an array segment of one element is considered already sorted.
  if (start >= end) {
    return;
  }

  // Generate a random index to be the pivot element.
  const pivotIndex = Math.floor(Math.random() * (end - start + 1)) + start;
  const pivotValue = arr[pivotIndex];

  // Place the pivot element at the end of the array segment.
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

  // Track the boundary of the "less-than" array segment.
  let lessThanPointer = start;

  // Compare each value in the array segment, excluding the pivot element.
  for (let i = start; i < end; i++) {
    // If the value is smaller than the pivot element, place it in the left
    // portion of the array segment, then increment the boundary.
    if (arr[i] <= pivotValue) {
      [arr[lessThanPointer], arr[i]] = [arr[i], arr[lessThanPointer]];
      lessThanPointer++;
    }
  }

  // Place the pivot pointer's value in it's correct position by swapping it's value with the
  // less-than pointer's value.
  [arr[lessThanPointer], arr[end]] = [arr[end], arr[lessThanPointer]];

  // Divide the array into two segments and recursively process them.
  quickSort(arr, start, lessThanPointer - 1); // Less than the pivot.
  quickSort(arr, lessThanPointer + 1, end); // Greater than the pivot.
}
