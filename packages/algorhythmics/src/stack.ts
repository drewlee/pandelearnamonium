import Node from './nodes/node.js';

/**
 * A stack is a data structure that follows a last in, first out (LIFO) protocol.
 * The last value added to a stack is the value that is eligible to be removed first.
 * Stacks are highly efficient as adding and retrieving elements occur in O(1) time.
 */
export default class Stack<T> {
  size: number;
  top: Node<T> | null;

  constructor() {
    this.size = 0;
    this.top = null;
  }

  /**
   * Determines whether the stack contains any values.
   *
   * @returns Whether the stack contains any values.
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Pushes a new value to the top of the stack.
   *
   * @param value - Value to add to the stack.
   */
  push(value: T): void {
    const node = new Node(value);

    if (this.top !== null) {
      node.next = this.top;
    }

    this.top = node;
    this.size++;
  }

  /**
   * Returns the value at the top of the stack.
   *
   * @returns Top-most value of the stack.
   */
  peek(): T | null {
    if (this.top === null) {
      return null;
    }

    return this.top.value;
  }

  /**
   * Removes and returns the value at the top of the stack.
   *
   * @returns Top-most value of the stack.
   */
  pop(): T | null {
    if (this.top === null) {
      return null;
    }

    const node = this.top;
    this.top = node.next;
    node.next = null;
    this.size--;

    return node.value;
  }
}
