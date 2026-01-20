import DoublyLinkedList from '../src/doubly-linked-list.ts';
import DLLNode from '../src/dll-node.ts';

test('Creates an instance with defaults', () => {
  const list = new DoublyLinkedList();

  expect(list).toBeInstanceOf(DoublyLinkedList);
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
});

test('Creates an instance with the specified value', () => {
  const value = 13;
  const list = new DoublyLinkedList(value);

  expect(list.head).toBeInstanceOf(DLLNode);
  expect(list.head?.value).toBe(value);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next).toBeNull();

  expect(list.tail).toBeInstanceOf(DLLNode);
  expect(list.tail?.value).toBe(value);
  expect(list.tail?.prev).toBeNull();
  expect(list.tail?.next).toBeNull();
});

test('Adds a new value to the head of the list', () => {
  const value = 13;
  const list = new DoublyLinkedList<number>();

  list.addToHead(value);

  expect(list.head?.value).toBe(value);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next).toBeNull();

  expect(list.tail?.value).toBe(value);
  expect(list.tail?.prev).toBeNull();
  expect(list.tail?.next).toBeNull();
});

test('Adds multiple values to the head of the list', () => {
  const values = [13, 15, 19];
  const list = new DoublyLinkedList<number>();

  list.addToHead(values[0]);
  list.addToHead(values[1]);

  expect(list.head?.value).toBe(values[1]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next?.value).toBe(values[0]);

  expect(list.tail?.value).toBe(values[0]);
  expect(list.tail?.prev?.value).toBe(values[1]);
  expect(list.tail?.next).toBeNull();

  list.addToHead(values[2]);

  expect(list.head?.value).toBe(values[2]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next?.value).toBe(values[1]);

  expect(list.tail?.value).toBe(values[0]);
  expect(list.tail?.prev?.value).toBe(values[1]);
  expect(list.tail?.next).toBeNull();
});

test('Adding to head maintains the correct list order', () => {
  const values = [13, 15, 19, 22, 27];
  const list = new DoublyLinkedList<number>();

  for (const value of values) {
    list.addToHead(value);
  }

  const result: number[] = [];
  let node = list.head;

  while (node !== null) {
    result.push(node.value!);
    node = node.next;
  }

  expect(result).toStrictEqual([...values].reverse());
});

test('Adds a new value to the tail of the list', () => {
  const value = 13;
  const list = new DoublyLinkedList<number>();

  list.addToTail(value);

  expect(list.head?.value).toBe(value);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next).toBeNull();

  expect(list.tail?.value).toBe(value);
  expect(list.tail?.prev).toBeNull();
  expect(list.tail?.next).toBeNull();
});

test('Adds multiple values to the tail of the list', () => {
  const values = [13, 15, 19];
  const list = new DoublyLinkedList<number>();

  list.addToTail(values[0]);
  list.addToTail(values[1]);

  expect(list.head?.value).toBe(values[0]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next?.value).toBe(values[1]);

  expect(list.tail?.value).toBe(values[1]);
  expect(list.tail?.prev?.value).toBe(values[0]);
  expect(list.tail?.next).toBeNull();

  list.addToTail(values[2]);

  expect(list.head?.value).toBe(values[0]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next?.value).toBe(values[1]);

  expect(list.tail?.value).toBe(values[2]);
  expect(list.tail?.prev?.value).toBe(values[1]);
  expect(list.tail?.next).toBeNull();
});

test('Adding to tail maintains the correct list order', () => {
  const values = [13, 15, 19, 22, 27];
  const list = new DoublyLinkedList<number>();

  for (const value of values) {
    list.addToTail(value);
  }

  const result: number[] = [];
  let node = list.head;

  while (node !== null) {
    result.push(node.value!);
    node = node.next;
  }

  expect(result).toStrictEqual(values);
});

test('Removes the head node from a list', () => {
  const values = [13, 15, 19];
  const list = new DoublyLinkedList<number>();

  for (const value of values) {
    list.addToHead(value);
  }

  const result = list.removeHead();
  expect(result).toBe(values[2]);

  expect(list.head?.value).toBe(values[1]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next?.value).toBe(values[0]);

  expect(list.tail?.value).toBe(values[0]);
  expect(list.tail?.prev?.value).toBe(values[1]);
  expect(list.tail?.next).toBeNull();
});

test('Removes the head node from a list with a single item', () => {
  const value = 13;
  const list = new DoublyLinkedList(value);
  const result = list.removeHead();

  expect(result).toBe(value);
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
});

test('Removing the head from an empty list returns `null`', () => {
  const list = new DoublyLinkedList<null>();
  const result = list.removeHead();

  expect(result).toBeNull();
});

test('Removes the tail node from a list', () => {
  const values = [13, 15, 19];
  const list = new DoublyLinkedList<number>();

  for (const value of values) {
    list.addToTail(value);
  }

  const result = list.removeTail();
  expect(result).toBe(values[2]);

  expect(list.head?.value).toBe(values[0]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next?.value).toBe(values[1]);

  expect(list.tail?.value).toBe(values[1]);
  expect(list.tail?.prev?.value).toBe(values[0]);
  expect(list.tail?.next).toBeNull();
});

test('Removes the tail node from a list with a single item', () => {
  const value = 13;
  const list = new DoublyLinkedList(value);
  const result = list.removeTail();

  expect(result).toBe(value);
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
});

test('Removing the tail from an empty list returns `null`', () => {
  const list = new DoublyLinkedList<null>();
  const result = list.removeTail();

  expect(result).toBeNull();
});

test('Removes the specified node from the list', () => {
  const values = [13, 15, 19];
  const list = new DoublyLinkedList<number>();

  for (const value of values) {
    list.addToHead(value);
  }

  const result = list.remove(values[1]);

  expect(result).toBeInstanceOf(DLLNode);
  expect(result?.value).toBe(values[1]);
  expect(result?.prev).toBeNull();
  expect(result?.next).toBeNull();

  expect(list.head?.value).toBe(values[2]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next?.value).toBe(values[0]);

  expect(list.tail?.value).toBe(values[0]);
  expect(list.tail?.prev?.value).toBe(values[2]);
  expect(list.tail?.next).toBeNull();
});

test('Removes the first node from the list', () => {
  const values = [13, 15, 19];
  const list = new DoublyLinkedList<number>();

  for (const value of values) {
    list.addToHead(value);
  }

  const result = list.remove(values[2]);

  expect(result).toBeInstanceOf(DLLNode);
  expect(result?.value).toBe(values[2]);
  expect(result?.prev).toBeNull();
  expect(result?.next).toBeNull();

  expect(list.head?.value).toBe(values[1]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next?.value).toBe(values[0]);

  expect(list.tail?.value).toBe(values[0]);
  expect(list.tail?.prev?.value).toBe(values[1]);
  expect(list.tail?.next).toBeNull();
});

test('Removes the last node from the list', () => {
  const values = [13, 15, 19];
  const list = new DoublyLinkedList<number>();

  for (const value of values) {
    list.addToHead(value);
  }

  const result = list.remove(values[0]);

  expect(result).toBeInstanceOf(DLLNode);
  expect(result?.value).toBe(values[0]);
  expect(result?.prev).toBeNull();
  expect(result?.next).toBeNull();

  expect(list.head?.value).toBe(values[2]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next?.value).toBe(values[1]);

  expect(list.tail?.value).toBe(values[1]);
  expect(list.tail?.prev?.value).toBe(values[2]);
  expect(list.tail?.next).toBeNull();
});

test('Removes a node from the list with a single item', () => {
  const value = 13;
  const list = new DoublyLinkedList(value);

  const result = list.remove(value);

  expect(result?.value).toBe(value);
  expect(list.head).toBeNull();
  expect(list.tail).toBeNull();
});

test('Removes the first node from the list with two items', () => {
  const values = [13, 17];
  const list = new DoublyLinkedList<number>();

  for (const value of values) {
    list.addToHead(value);
  }

  const result = list.remove(values[0]);

  expect(result?.value).toBe(values[0]);

  expect(list.head?.value).toBe(values[1]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next).toBeNull();

  expect(list.tail?.value).toBe(values[1]);
  expect(list.tail?.prev).toBeNull();
  expect(list.tail?.next).toBeNull();
});

test('Removes the last node from the list with two items', () => {
  const values = [13, 17];
  const list = new DoublyLinkedList<number>();

  for (const value of values) {
    list.addToHead(value);
  }

  const result = list.remove(values[1]);

  expect(result?.value).toBe(values[1]);

  expect(list.head?.value).toBe(values[0]);
  expect(list.head?.prev).toBeNull();
  expect(list.head?.next).toBeNull();

  expect(list.tail?.value).toBe(values[0]);
  expect(list.tail?.prev).toBeNull();
  expect(list.tail?.next).toBeNull();
});

test('Removing a node with a non-existing value returns `null`', () => {
  const values = [13, 15, 19];
  const list = new DoublyLinkedList<number>();

  for (const value of values) {
    list.addToTail(value);
  }

  const result = list.remove(44);
  expect(result).toBeNull();
});

test('Removing a node from an empty list returns `null`', () => {
  const list = new DoublyLinkedList<number>();
  const result = list.remove(44);

  expect(result).toBeNull();
});
