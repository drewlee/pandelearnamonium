import Node from './node.js';

/**
 * The linked list data structure is a utility for creating a chain of linked nodes,
 * where new values are appended to the head of the list. Insertions occur in O(1) time,
 * while removals have a worst case O(n) time, due to the need to traverse through the list.
 */
export default class LinkedList<T> {
  head: Node<T> | null;

  /**
   * @param value - Optional value to insert at the head of the linked list.
   */
  constructor(value?: T) {
    this.head = value !== undefined ? new Node<T>(value) : null;
  }

  /**
   * Inserts a new node with the specified value at the head of the linked list.
   *
   * @param value - Value to insert.
   */
  insert(value: T): void {
    const node = new Node(value);

    node.next = this.head;
    this.head = node;
  }

  /**
   * Removes the node associated with the specified value from the linked list.
   *
   * @param value - Value corresponding to the node to be removed.
   * @returns The removed node.
   */
  remove(value: T): Node<T> | null {
    let prevNode: Node<T> | null = null;
    let currNode: Node<T> | null = this.head;

    while (currNode !== null) {
      if (currNode.value === value) {
        if (prevNode !== null) {
          // Set the previous node's pointer to the next node
          prevNode.next = currNode.next;
        } else {
          // The head node is to be removed if there's no previous node
          this.head = currNode.next;
        }

        currNode.next = null;

        return currNode;
      }

      prevNode = currNode;
      currNode = currNode.next;
    }

    return null;
  }
}
