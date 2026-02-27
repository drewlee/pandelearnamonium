/**
 * The min-heap maintains the minimum value at the top of the dataset. It's the basis of the
 * heapsort algorithm, which runs in O(n log n) time. It uses O(1) space if sorted in place, but
 * results in descending order. Assigning the sorted values into a new array uses O(n) space.
 */
export default class MinHeap<T> {
  /** Custom comparison function for usage with non-primitive values. */
  comparisonPredicate?: (item1: T, item2: T) => boolean;
  heap: T[];

  get length(): number {
    return this.heap.length;
  }

  constructor(comparisonPredicate?: (item1: T, item2: T) => boolean) {
    this.heap = [];
    this.comparisonPredicate = comparisonPredicate;
  }

  /**
   * Comparison function used for heapification.
   *
   * @param item1 - First item to compare.
   * @param item2 - Second item to compare.
   * @returns Whether the first item's value is less than the second item's value.
   */
  private isLessThan(item1: T, item2: T): boolean {
    if (this.comparisonPredicate !== undefined) {
      return this.comparisonPredicate(item1, item2);
    }
    return item1 < item2;
  }

  /**
   * Returns the parent index corresponding to the provided index.
   *
   * @param index - Index to compute the parent index for.
   * @returns Parent index.
   */
  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Returns the child indices corresponding to the provided index.
   *
   * @param index - Index to compute the child indices for.
   * @returns Child indices.
   */
  private getChildIndices(index: number): [number, number] {
    const child1 = index * 2 + 1;
    const child2 = child1 + 1;

    return [child1, child2];
  }

  /**
   * Iteratively swaps the values at the given index if its parent value is less than
   * the current value.
   *
   * @param index - Index to begin the value comparisons.
   * @param heap - Array to heapify.
   */
  heapifyUp(index: number, heap = this.heap): void {
    let currIndex = index;
    let parentIndex = this.getParentIndex(currIndex);

    while (currIndex > 0 && this.isLessThan(heap[currIndex], heap[parentIndex])) {
      [heap[currIndex], heap[parentIndex]] = [heap[parentIndex], heap[currIndex]];
      currIndex = parentIndex;
      parentIndex = this.getParentIndex(currIndex);
    }
  }

  /**
   * Iteratively swaps the values at the given index if its child
   * values are less than the current value.
   *
   * @param heap - Array to heapify.
   * @param length - Length of the array to heapify.
   */
  heapifyDown(heap = this.heap, length = this.heap.length): void {
    let currIndex = 0;
    let [childIdx1, childIdx2] = this.getChildIndices(currIndex);

    while (childIdx1 < length) {
      // Determine which child has the minimum value.
      let minChildIdx = childIdx2;

      if (childIdx2 >= length || this.isLessThan(heap[childIdx1], heap[childIdx2])) {
        minChildIdx = childIdx1;
      }

      // Swap values.
      if (this.isLessThan(heap[minChildIdx], heap[currIndex])) {
        [heap[minChildIdx], heap[currIndex]] = [heap[currIndex], heap[minChildIdx]];
      }

      currIndex = minChildIdx;
      [childIdx1, childIdx2] = this.getChildIndices(currIndex);
    }
  }

  /**
   * Inserts the provided value into the heap.
   *
   * @param value - Value to insert.
   */
  insert(value: T): void {
    const newLength = this.heap.push(value);
    this.heapifyUp(newLength - 1);
  }

  /**
   * Removes the minimum (root) value from the top of the heap.
   *
   * @returns Minimum heap value.
   */
  remove(): T | null {
    const { length } = this.heap;

    // Terminate if the heap is empty.
    if (!length) {
      return null;
    }

    // Swap the first and last values.
    [this.heap[0], this.heap[length - 1]] = [this.heap[length - 1], this.heap[0]];

    const topValue = this.heap.pop()!;

    if (length - 1 > 0) {
      this.heapifyDown();
    }

    return topValue;
  }

  /**
   * Sorts the given list of values in ascending order using the min-heap algorithm.
   * Uses O(n) space as it creates a new array of values.
   *
   * @param values - Array of values to sort.
   * @returns Array of sorted values.
   */
  sort(values: T[]): T[] {
    if (values.length <= 1) {
      return values;
    }

    const heapified: T[] = values.slice();

    // Insert the given values into the heap.
    for (let i = 1; i < values.length; i++) {
      this.heapifyUp(i, heapified);
    }

    const sorted: T[] = [];

    // Extract the heapified values from the heap.
    while (heapified.length) {
      [heapified[0], heapified[heapified.length - 1]] = [
        heapified[heapified.length - 1],
        heapified[0],
      ];

      const topValue = heapified.pop()!;

      this.heapifyDown(heapified, heapified.length);
      sorted.push(topValue);
    }

    return sorted;
  }

  /**
   * Sorts the given list of values using the min-heap algorithm. Uses O(1) space as it
   * sorts in-place, but the result is in descending instead of ascending order.
   *
   * @param values - Array of values to sort.
   * @returns Array of sorted values.
   */
  sortInPlace(values: T[]): T[] {
    if (values.length <= 1) {
      return values;
    }

    for (let i = 1; i < values.length; i++) {
      this.heapifyUp(i, values);
    }

    for (let i = values.length - 1; i > 0; i--) {
      [values[0], values[i]] = [values[i], values[0]];

      // Heapify down the new value.
      this.heapifyDown(values, i);
    }

    return values;
  }
}
