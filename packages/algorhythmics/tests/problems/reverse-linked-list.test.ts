import Node from '../../src/nodes/node.ts';
import LinkedList from '../../src/linked-list.ts';
import reverseLinkedList from '../../src/problems/reverse-linked-list.ts';

function createLinkedList<T>(values: T[]): Node<T> {
  const rValues = [...values].reverse();
  const list = new LinkedList<T>();

  rValues.forEach((value) => list.insert(value));

  return list.head!;
}

describe('reverseLinkedList', () => {
  test('Reverses the linked list', () => {
    const values = [1, 3, 5, 7, 9];
    const head = createLinkedList(values);
    const result = reverseLinkedList(head);

    const expected: number[] = [];
    let curr: Node<number> | null = result;

    while (curr !== null) {
      expected.push(curr.value!);
      curr = curr.next;
    }

    expect(expected).toStrictEqual(values.reverse());
  });

  test('Reverses the linked list with a single node', () => {
    const head = new Node(1);
    const result = reverseLinkedList(head);

    expect(result.value).toBe(1);
    expect(result.next).toBeNull();
  });

  test('Returns an empty node for an invalid linked list', () => {
    const result = reverseLinkedList(null);

    expect(result.value).toBeNull();
    expect(result.next).toBeNull();
  });
});
