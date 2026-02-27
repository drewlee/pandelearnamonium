/**
 * The max-heap maintains the maximum value at the top of the dataset. It's the basis of the
 * heapsort algorithm, which runs in O(n log n) time. It uses O(1) space if sorted in place, but
 * results in ascending order. Assigning the sorted values into a new array uses O(n) space.
 */
export default class MaxHeap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  /**
   * Returns the parent index corresponding to the provided index.
   *
   * @param index - Index to compute the parent index for.
   * @returns Parent index.
   */
  getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Returns the child indices corresponding to the provided index.
   *
   * @param index - Index to compute the child indices for.
   * @returns Child indices.
   */
  getChildIndices(index: number): [number, number] {
    const child1 = index * 2 + 1;
    const child2 = child1 + 1;

    return [child1, child2];
  }

  /**
   * Iteratively swaps the values at the given index if its parent value is lesser than
   * the current value.
   *
   * @param index - Index to begin the value comparisons.
   * @param heap - Array to heapify.
   */
  heapifyUp(index: number, heap = this.heap): void {
    let currIndex = index;
    let parentIndex = this.getParentIndex(currIndex);

    while (currIndex > 0 && heap[currIndex] > heap[parentIndex]) {
      [heap[currIndex], heap[parentIndex]] = [heap[parentIndex], heap[currIndex]];
      currIndex = parentIndex;
      parentIndex = this.getParentIndex(currIndex);
    }
  }

  /**
   * Iteratively swaps the values at the given index if its child
   * values are greater than the current value.
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

      if (childIdx2 >= length || heap[childIdx1] > heap[childIdx2]) {
        minChildIdx = childIdx1;
      }

      // Swap values.
      if (heap[minChildIdx] > heap[currIndex]) {
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
  insert(value: number): void {
    const newLength = this.heap.push(value);
    this.heapifyUp(newLength - 1);
  }

  /**
   * Removes the maximum (root) value from the top of the heap.
   *
   * @returns Maximum heap value.
   */
  remove(): number | null {
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
   * Sorts the given list of values in descending order using the min-heap algorithm.
   * Uses O(n) space as it creates a new array of values.
   *
   * @param values - Array of values to sort.
   * @returns Array of sorted values.
   */
  sort(values: number[]): number[] {
    if (values.length <= 1) {
      return values;
    }

    const heapified: number[] = values.slice();

    // Insert the given values into the heap.
    for (let i = 1; i < values.length; i++) {
      this.heapifyUp(i, heapified);
    }

    const sorted: number[] = [];

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
   * Sorts the given list of values using the min-heap algorithm. Use O(1) space as it
   * sorts in-place, but the result is in ascending instead of descending order.
   *
   * @param values - Array of values to sort.
   * @returns Array of sorted values.
   */
  sortInPlace(values: number[]): number[] {
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
