import Node from '../../src/node.ts';
import createLinkedList from './create-linked-list';

describe('createLinkedList', () => {
  test('Creates an instance of Node', () => {
    const values = [1];
    const head = createLinkedList(values);

    expect(head).toBeInstanceOf(Node);
  });

  test('Creates a linked list from an array of values', () => {
    const values = [1, 2, 3];
    const head = createLinkedList(values);

    let curr: Node<number> | null = head;
    let i = 0;

    while (curr !== null) {
      expect(values[i]).toBe(curr.value);
      curr = curr.next;
      i++;
    }
  });

  test('Returns an empty node if the array is empty', () => {
    const values: number[] = [];
    const head = createLinkedList(values);

    expect(head.value).toBeNull();
    expect(head.next).toBeNull();
  });
});
