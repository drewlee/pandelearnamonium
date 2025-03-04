/**
 * A node is the basic data structure for linked lists. This is a minimal implementation, but more
 * in-depth classes usually include methods to get the node's value, to get the next node, and to
 * set a link to the next node.
 */
export default class Node<T> {
  value: T | undefined;
  next: Node<T> | null;

  /**
   * @param value - The node's data value.
   * @param next - The next node to link to.
   */
  constructor(value?: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
