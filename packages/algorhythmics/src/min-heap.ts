import HeapItem from './heap-item.js';

/**
 * The min-heap maintains the minimum value at the top of the dataset. It's the basis of the
 * heapsort algorithm, which runs in O(n log n) time. It uses O(1) space if sorted in place, but
 * results in descending order. Assigning the sorted values into a new array uses O(n) space.
 */
export default class MinHeap<T> {
  heap: HeapItem<T>[];

  get length(): number {
    return this.heap.length;
  }

  constructor() {
    this.heap = [];
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
   * Iteratively swaps the values at the given index if its parent value is greater than
   * the current value.
   *
   * @param index - Index to begin the value comparisons.
   * @param heap - Array to heapify.
   */
  heapifyUp(index: number, heap = this.heap): void {
    let currIndex = index;
    let parentIndex = this.getParentIndex(currIndex);

    while (currIndex > 0 && heap[currIndex].priority < heap[parentIndex].priority) {
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

      if (childIdx2 >= length || heap[childIdx1].priority < heap[childIdx2].priority) {
        minChildIdx = childIdx1;
      }

      // Swap values.
      if (heap[minChildIdx].priority < heap[currIndex].priority) {
        [heap[minChildIdx], heap[currIndex]] = [heap[currIndex], heap[minChildIdx]];
      }

      currIndex = minChildIdx;
      [childIdx1, childIdx2] = this.getChildIndices(currIndex);
    }
  }

  /**
   * Inserts the provided HeapItem into the heap.
   *
   * @param item - Item to insert.
   */
  insert(item: HeapItem<T>): void {
    const newLength = this.heap.push(item);
    this.heapifyUp(newLength - 1);
  }

  /**
   * Removes the minimum (root) value from the top of the heap.
   *
   * @returns Minimum heap value.
   */
  remove(): HeapItem<T> | null {
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

    const heapified = values.map((value) => new HeapItem(value));

    // Insert the given values into the heap.
    for (let i = 1; i < heapified.length; i++) {
      this.heapifyUp(i, heapified);
    }

    const sorted: HeapItem<T>[] = [];

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

    return sorted.map((item) => item.value);
  }

  /**
   * Sorts the given list of values using the min-heap algorithm. Uses O(1) space as it
   * sorts in-place, but the result is in descending instead of ascending order.
   *
   * @param items - Array of HeapItems to sort.
   * @returns Array of sorted values.
   */
  sortInPlace(items: HeapItem<T>[]): HeapItem<T>[] {
    if (items.length <= 1) {
      return items;
    }

    for (let i = 1; i < items.length; i++) {
      this.heapifyUp(i, items);
    }

    for (let i = items.length - 1; i > 0; i--) {
      [items[0], items[i]] = [items[i], items[0]];

      // Heapify down the new value.
      this.heapifyDown(items, i);
    }

    return items;
  }
}
