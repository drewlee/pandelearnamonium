import Node from '../../src/node.ts';
import createLinkedList from '../helpers/create-linked-list.ts';
import reverseLinkedList from '../../src/problems/reverse-linked-list.ts';

describe('reverseLinkedList', () => {
  test('Reverses the linked list', () => {
    const values = [1, 3, 5, 7, 9];
    const head = createLinkedList(values);
    const result = reverseLinkedList(head);

    let curr: Node<number> | null = result;
    let i = values.length - 1;

    while (curr !== null) {
      expect(curr.value).toBe(values[i]);
      curr = curr.next;
      i--;
    }
  });

  test('Reverses the linked list with a single node', () => {
    const head = new Node(1);
    const result = reverseLinkedList(head);

    expect(result.value).toBe(1);
    expect(result.next).toBeNull();
  });

  test('Returns an empty node for an invalid linked list', () => {
    const result = reverseLinkedList(null);

    expect(result.value).toBeUndefined();
    expect(result.next).toBeNull();
  });
});
