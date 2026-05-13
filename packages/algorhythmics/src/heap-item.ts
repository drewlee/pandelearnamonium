/**
 * Base data structure used within the min and max heaps data structure.
 */
export default class HeapItem<T> {
  value: T;
  priority: T | bigint | number | string;

  constructor(value: T, priority?: bigint | number | string) {
    this.value = value;
    this.priority = priority ?? value;
  }
}
