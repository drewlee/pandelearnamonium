import Node from '../nodes/node.js';

export default function reverseLinkedList<T>(head: Node<T> | null): Node<T> {
  let curr: Node<T> | null = head;
  let prev: Node<T> | null = null;

  while (curr !== null) {
    // 1. Store a reference to the next node in the list as otherwise it will be overridden.
    // 2. Link to the previous node, which was stored in the prior iteration.
    // 3. Store a reference to the current node as `prev` for the next iteration.
    // 4. Update `current` to the next node in the list.
    const { next }: Node<T> = curr;

    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Once the loop terminates, `prev` references the new head of the list.
  return prev ?? new Node();
}
