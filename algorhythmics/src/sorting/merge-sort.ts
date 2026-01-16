/**
 * Helper utility to merge two split arrays back into one as part of the `Merge Sort` algorithm.
 *
 * @param leftSplit - The left portion of an array.
 * @param rightSplit - The right portion of an array.
 * @returns The merged array.
 */
function merge(leftSplit: number[], rightSplit: number[]): number[] {
  const mergedArr: number[] = [];

  // Compare the first value of each array and place the smallest of the two.
  // Remove the value from the corresponding array so that the next value can be compared.
  while (leftSplit.length && rightSplit.length) {
    if (leftSplit[0] < rightSplit[0]) {
      mergedArr.push(leftSplit.shift()!);
    } else {
      mergedArr.push(rightSplit.shift()!);
    }
  }

  // Handle the remaining elements of an array once the complementing array has been exhausted.
  if (leftSplit.length) {
    mergedArr.push(...leftSplit);
  }

  if (rightSplit.length) {
    mergedArr.push(...rightSplit);
  }

  return mergedArr;
}

/**
 * Sorts the specified array using the `Merge Sort` algorithm. Does not mutate the original array.
 * O(n log n) time.
 * O(n) space.
 *
 * @remarks
 * `Merge Sort` is a "divide and conquer" algorithm which works by recursively breaking down the
 * given array into smaller parts, then recomposing them back together where the actual sorting
 * process occurs.
 *
 * @param arr - The array to sort.
 * @returns The sorted array.
 */
export default function mergeSort(arr: number[]): number[] {
  // Base case: an array of one element is considered already sorted.
  if (arr.length <= 1) {
    return arr;
  }

  // Split the array into two halves.
  const midIndex = Math.floor(arr.length / 2);

  const leftSplit = arr.slice(0, midIndex);
  const rightSplit = arr.slice(midIndex);

  // Recursively process the split halves.
  const leftSorted = mergeSort(leftSplit);
  const rightSorted = mergeSort(rightSplit);

  // Merge the two sorted halves back into a single array.
  return merge(leftSorted, rightSorted);
}
