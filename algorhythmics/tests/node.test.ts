import Node from '../src/node.ts';

test('Creates an instance with defaults', () => {
  const value = 12;
  const node = new Node(value);

  expect(node).toBeInstanceOf(Node);
  expect(node.value).toBe(value);
  expect(node.next).toBeNull();
});

test('Creates an instance with no value', () => {
  const node = new Node();

  expect(node.value).toBeNull();
  expect(node.next).toBeNull();
});

test('Links instances using the constructor', () => {
  const valueA = 'a';
  const valueB = 'b';
  const nodeB = new Node(valueB);
  const nodeA = new Node(valueA, nodeB);

  expect(nodeA.value).toBe(valueA);
  expect(nodeB.value).toBe(valueB);
  expect(nodeA.next).toBe(nodeB);
  expect(nodeB.next).toBeNull();
});

test('Links instances using the `next` property', () => {
  const valueA = 'a';
  const valueB = 'b';
  const nodeA = new Node(valueA);
  const nodeB = new Node(valueB);

  nodeA.next = nodeB;

  expect(nodeA.value).toBe(valueA);
  expect(nodeB.value).toBe(valueB);
  expect(nodeA.next).toBe(nodeB);
  expect(nodeB.next).toBeNull();
});
