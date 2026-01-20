import LinkedList from '../src/linked-list.ts';
import Node from '../src/node.ts';

test('Creates an instance with defaults', () => {
  const list = new LinkedList();

  expect(list).toBeInstanceOf(LinkedList);
  expect(list.head).toBeNull();
});

test('Creates an instance with the specified value', () => {
  const value = 13;
  const list = new LinkedList(value);

  expect(list.head).toBeInstanceOf(Node);
  expect(list.head?.value).toBe(value);
  expect(list.head?.next).toBeNull();
});

test('Inserts a new value at the head of the list', () => {
  const value = 13;
  const list = new LinkedList<number>();

  list.insert(value);

  expect(list.head?.value).toBe(value);
  expect(list.head?.next).toBeNull();
});

test('Inserts multiple values at the head of the list', () => {
  const values = [13, 15, 19];
  const list = new LinkedList<number>();

  list.insert(values[0]);
  list.insert(values[1]);
  expect(list.head?.value).toBe(values[1]);

  list.insert(values[2]);
  expect(list.head?.value).toBe(values[2]);
});

test('Inserts multiple values after instantiating with a value', () => {
  const values = [13, 15, 19];
  const list = new LinkedList(values[0]);

  list.insert(values[1]);
  expect(list.head?.value).toBe(values[1]);
  expect(list.head?.next?.value).toBe(values[0]);

  list.insert(values[2]);
  expect(list.head?.value).toBe(values[2]);
  expect(list.head?.next?.value).toBe(values[1]);
});

test('Insertion maintains the correct list order', () => {
  const values = [13, 15, 19, 22, 27];
  const list = new LinkedList<number>();

  for (const value of values) {
    list.insert(value);
  }

  const result: number[] = [];
  let node = list.head;

  while (node !== null) {
    result.push(node.value!);
    node = node.next;
  }

  expect(result).toStrictEqual([...values].reverse());
});

test('Removes a value from the middle of the list', () => {
  const values = [13, 15, 19];
  const list = new LinkedList<number>();

  for (const value of values) {
    list.insert(value);
  }

  list.remove(values[1]);

  expect(list.head?.value).toBe(values[2]);
  expect(list.head?.next?.value).toBe(values[0]);
});

test('Removes a value from the end of the list', () => {
  const values = [13, 15, 19];
  const list = new LinkedList<number>();

  for (const value of values) {
    list.insert(value);
  }

  list.remove(values[0]);

  expect(list.head?.value).toBe(values[2]);
  expect(list.head?.next?.value).toBe(values[1]);
});

test('Removes a value from the beginning of the list', () => {
  const values = [13, 15, 19];
  const list = new LinkedList<number>();

  for (const value of values) {
    list.insert(value);
  }

  list.remove(values[2]);

  expect(list.head?.value).toBe(values[1]);
  expect(list.head?.next?.value).toBe(values[0]);
});

test('Removing a non-existing value is ignored', () => {
  const value = 13;
  const list = new LinkedList<number>();

  list.insert(value);
  list.remove(44);

  expect(list.head?.value).toBe(value);
});

test('Insertion & removal maintains the correct list order', () => {
  const values = [13, 15, 19, 22, 27];
  const list = new LinkedList<number>();

  for (const value of values) {
    list.insert(value);
  }

  list.remove(values[3]); // 22
  list.remove(values[0]); // 13

  const newValue = 99;
  list.insert(newValue);

  const result: number[] = [];
  let node = list.head;

  while (node !== null) {
    result.push(node.value!);
    node = node.next;
  }

  const expected = [...values.slice(1, 3), ...values.slice(4), newValue].reverse();
  expect(result).toStrictEqual(expected);
});
