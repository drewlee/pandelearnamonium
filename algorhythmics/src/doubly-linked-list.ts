import DLLNode from './dll-node.js';

/**
 * Nodes in a doubly linked list can be inserted either at the head or the tail end of the list.
 * This is facilitated by an enhanced node implementation, which includes an additional pointer to
 * the previous node. Insertions occur in O(1) time at both ends. Removing either the first or the
 * last node occurs in O(1) time, while removals from the middle of the list have a worst case O(n)
 * time, due to the need to traverse through the list.
 */
export default class DoublyLinkedList<T> {
  head: DLLNode<T> | null;
  tail: DLLNode<T> | null;

  /**
   * @param value - Optional value to add to the linked list.
   */
  constructor(value?: T) {
    const node = value !== undefined ? new DLLNode<T>(value) : null;

    this.head = node;
    this.tail = node;
  }

  /**
   * Adds a new node with the specified value to the head of the linked list.
   *
   * @param value - Value to insert.
   */
  addToHead(value: T): void {
    const node = new DLLNode(value);

    if (this.head !== null) {
      this.head.prev = node;
      node.next = this.head;
    }

    this.head = node;

    if (this.tail === null) {
      this.tail = node;
    }
  }

  /**
   * Adds a new node with the specified value to the tail of the linked list.
   *
   * @param value - Value to insert.
   */
  addToTail(value: T): void {
    const node = new DLLNode(value);

    if (this.tail !== null) {
      this.tail.next = node;
      node.prev = this.tail;
    }

    this.tail = node;

    if (this.head === null) {
      this.head = node;
    }
  }

  /**
   * Removes the head node from the linked list and returns its value.
   *
   * @returns The removed node's value.
   */
  removeHead(): T | null {
    if (this.head === null) {
      return null;
    }

    const node = this.head;

    this.head = node.next;

    if (this.head !== null) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    node.next = null;

    return node.value;
  }

  /**
   * Removes the tail node from the linked list and returns its value.
   *
   * @returns The removed node's value.
   */
  removeTail(): T | null {
    if (this.tail === null) {
      return null;
    }

    const node = this.tail;

    this.tail = node.prev;

    if (this.tail !== null) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    node.prev = null;

    return node.value;
  }

  /**
   * Removes the node associated with the specified value from the linked list.
   *
   * @param value - Value corresponding to the node to be removed.
   * @returns The removed node.
   */
  remove(value: T): DLLNode<T> | null {
    let node: DLLNode<T> | null = this.head;

    while (node !== null && node.value !== value) {
      node = node.next;
    }

    if (node === null) {
      return null;
    }

    if (node === this.head) {
      this.removeHead();
    } else if (node === this.tail) {
      this.removeTail();
    } else {
      node.prev!.next = node.next;
      node.next!.prev = node.prev;
      node.prev = null;
      node.next = null;
    }

    return node;
  }
}
