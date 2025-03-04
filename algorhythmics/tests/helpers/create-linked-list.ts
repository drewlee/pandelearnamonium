import Node from '../../src/node.ts';

/**
 * Creates a linked list from the specified array of values.
 *
 * @param values - An array of values to create a linked list from.
 * @returns The head node of the linked list.
 */
export default function createLinkedList<T>(values: T[]): Node<T> {
  let next: Node<T> | null = null;

  for (let i = values.length - 1; i >= 0; i--) {
    const node: Node<T> = new Node<T>(values[i], next);
    next = node;
  }

  return next ?? new Node();
}
