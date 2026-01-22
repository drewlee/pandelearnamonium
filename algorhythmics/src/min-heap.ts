/**
 * TODO
 */
export default class MinHeap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  /**
   * Returns the parent index corresponding to the given child index.
   *
   * @param index - Index to compute the parent index for.
   * @returns Parent index.
   */
  getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Returns the child indices corresponding to the given parent index.
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
   * Iteratively swaps the values at the given index if its parent's value is less than
   * the current value.
   *
   * @param index - Index to begin the value comparisons.
   */
  heapifyUp(index: number): void {
    let currIndex = index;
    let parentIndex = this.getParentIndex(currIndex);

    while (currIndex > 0 && this.heap[currIndex] < this.heap[parentIndex]) {
      [this.heap[currIndex], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[currIndex],
      ];
      currIndex = parentIndex;
      parentIndex = this.getParentIndex(currIndex);
    }
  }

  /**
   * Iteratively swaps the values at the given index if its children's
   * values are less than the current value.
   *
   * @param index - Index to begin the value comparisons.
   */
  heapifyDown(index: number): void {
    const length = this.heap.length;
    let currIndex = index;
    let [childIdx1, childIdx2] = this.getChildIndices(currIndex);

    while (childIdx1 < length) {
      // Determine which child has the minimum value.
      let minChildIdx = childIdx2;

      if (childIdx2 >= length || this.heap[childIdx1] < this.heap[childIdx2]) {
        minChildIdx = childIdx1;
      }

      // Swap values.
      if (this.heap[minChildIdx] < this.heap[currIndex]) {
        [this.heap[minChildIdx], this.heap[currIndex]] = [
          this.heap[currIndex],
          this.heap[minChildIdx],
        ];
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
   * Removes the minimum (root) value from the top of the heap.
   *
   * @returns Minimum heap value.
   */
  remove(): number | null {
    // Terminate if the heap is empty.
    if (!this.heap.length) {
      return null;
    }

    const bottomValue = this.heap.pop()!;
    const { length } = this.heap;

    // No need to heapify if the heap is now empty.
    if (!length) {
      return bottomValue;
    }

    // Swap the top and bottom values.
    const topIndex = 0;
    const topValue = this.heap[topIndex];
    this.heap[topIndex] = bottomValue;

    this.heapifyDown(topIndex);

    return topValue;
  }

  /**
   * Sorts the given list of values in ascending order using the min-heap algorithm.
   *
   * @param values - Array of values to sort.
   * @returns Array of sorted values.
   */
  sort(values: number[]): number[] {
    const sorted: number[] = [];

    // Insert the given values into the heap.
    for (const value of values) {
      this.insert(value);
    }

    // Extract the heapified values from the heap.
    while (this.heap.length) {
      sorted.push(this.remove()!);
    }

    return sorted;
  }
}
