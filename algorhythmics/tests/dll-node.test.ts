import DLLNode from '../src/dll-node.ts';

test('Creates an instance with defaults', () => {
  const value = 12;
  const node = new DLLNode(value);

  expect(node).toBeInstanceOf(DLLNode);
  expect(node.value).toBe(value);
  expect(node.next).toBeNull();
  expect(node.prev).toBeNull();
});

test('Creates an instance with no value', () => {
  const node = new DLLNode();

  expect(node.value).toBeNull();
  expect(node.next).toBeNull();
  expect(node.prev).toBeNull();
});

test('Links instances using the constructor', () => {
  const valueA = 'a';
  const valueB = 'b';
  const valueC = 'c';
  const nodeC = new DLLNode(valueC);
  const nodeA = new DLLNode(valueA);
  const nodeB = new DLLNode(valueB, nodeC, nodeA);

  expect(nodeB.next).toBe(nodeC);
  expect(nodeB.prev).toBe(nodeA);
});

test('Links instances using the `next` & `prev` properties', () => {
  const valueA = 'a';
  const valueB = 'b';
  const valueC = 'c';
  const nodeA = new DLLNode(valueA);
  const nodeB = new DLLNode(valueB);
  const nodeC = new DLLNode(valueC);

  nodeA.next = nodeB;
  nodeB.prev = nodeA;
  nodeB.next = nodeC;
  nodeC.prev = nodeB;

  expect(nodeA.prev).toBeNull();
  expect(nodeA.next).toBe(nodeB);
  expect(nodeB.prev).toBe(nodeA);
  expect(nodeB.next).toBe(nodeC);
  expect(nodeC.prev).toBe(nodeB);
  expect(nodeC.next).toBeNull();
});
