/**
 * Base data structure used within min and max heaps.
 */
export default class HeapItem<T> {
  item: T;
  priority: T | bigint | number | string;

  constructor(item: T, priority = item) {
    this.item = item;
    this.priority = priority;
  }
}
