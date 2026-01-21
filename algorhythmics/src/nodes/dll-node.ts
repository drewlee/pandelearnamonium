/**
 * For a doubly linked list, the node requires an additional pointer
 * to reference the previous node in the list.
 */
export default class DLLNode<T> {
  value: T | null;
  next: DLLNode<T> | null;
  prev: DLLNode<T> | null;

  /**
   * @param value - The node's data value.
   * @param next - The next node to link to.
   * @param prev - The previous node to link to.
   */
  constructor(
    value: T | null = null,
    next: DLLNode<T> | null = null,
    prev: DLLNode<T> | null = null,
  ) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
