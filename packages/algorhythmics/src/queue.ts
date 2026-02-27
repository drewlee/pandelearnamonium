import Node from './nodes/node.js';

/**
 * A queue is a data structure that follows a first in, first out (FIFO) protocol.
 * The first value added to a queue is the value that is eligible to be removed first.
 * Queues are highly efficient as adding and retrieving elements occur in O(1) time.
 */
export default class Queue<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Determines whether the queue contains any values.
   *
   * @returns Whether the queue contains any values.
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Adds a new value to the end of the queue.
   *
   * @param value - Value to add to the queue.
   */
  enqueue(value: T): void {
    const node = new Node(value);

    if (this.tail !== null) {
      this.tail.next = node;
    }

    this.tail = node;
    this.head ??= node;

    this.size++;
  }

  /**
   * Returns the value at the front of the queue.
   *
   * @returns Front value of the queue.
   */
  peek(): T | null {
    if (this.head === null) {
      return null;
    }

    return this.head.value;
  }

  /**
   * Removes and returns the value at the front of the queue.
   *
   * @returns Front value of the queue.
   */
  dequeue(): T | null {
    if (this.head === null) {
      return null;
    }

    const node = this.head;

    if (node.next !== null) {
      // Set the head to the next node in the queue
      this.head = node.next;
      node.next = null;
    } else {
      this.head = null;
      // Reset the tail if this is the only node left in the queue
      this.tail = null;
    }

    this.size--;

    return node.value;
  }
}
