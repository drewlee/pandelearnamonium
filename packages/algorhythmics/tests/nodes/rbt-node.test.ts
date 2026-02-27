import RBTNode from '../../src/nodes/rbt-node';

test('Creates an instance with defaults', () => {
  const value = 13;
  const node = new RBTNode<number>(value);

  expect(node).toBeInstanceOf(RBTNode);
  expect(node.value).toBe(value);
  expect(node.left).toBeNull();
  expect(node.right).toBeNull();
  expect(node.parent).toBeNull();
  expect(node.isRed).toBeFalsy();
});

test('Can set the value', () => {
  const value = 13;
  const node = new RBTNode<number>();

  expect(node.value).toBeNull();

  node.value = value;
  expect(node.value).toBe(value);
});

test('Links children and parents', () => {
  const value1 = 1;
  const value2 = 2;
  const value3 = 3;

  const node1 = new RBTNode<number>(value1);
  const node2 = new RBTNode<number>(value2);
  const node3 = new RBTNode<number>(value3);

  node2.left = node1;
  node2.right = node3;
  node1.parent = node2;
  node3.parent = node2;

  expect(node1.value).toBe(value1);
  expect(node2.value).toBe(value2);
  expect(node3.value).toBe(value3);

  expect(node1.parent).toBe(node2);
  expect(node1.left).toBeNull();
  expect(node1.right).toBeNull();

  expect(node2.parent).toBeNull();
  expect(node2.left).toBe(node1);
  expect(node2.right).toBe(node3);

  expect(node3.parent).toBe(node2);
  expect(node3.left).toBeNull();
  expect(node3.right).toBeNull();
});
