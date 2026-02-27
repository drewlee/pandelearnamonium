import TreeNode from '../../src/nodes/tree-node.ts';

test('Creates an instance with defaults', () => {
  const value = 'A';
  const node = new TreeNode(value);

  expect(node).toBeInstanceOf(TreeNode);
  expect(node.value).toBe(value);
  expect(node.children.length).toBe(0);
});

test('Can set the value', () => {
  const value = 'A';
  const node = new TreeNode();

  expect(node.value).toBeNull();

  node.value = value;
  expect(node.value).toBe(value);
});

test('Links children using the constructor', () => {
  const valueA = 'A';
  const valueB = 'B';
  const valueC = 'C';

  const nodeC = new TreeNode(valueC);
  const nodeB = new TreeNode(valueB);
  const nodeA = new TreeNode(valueA, [nodeB, nodeC]);

  expect(nodeA.value).toBe(valueA);
  expect(nodeB.value).toBe(valueB);
  expect(nodeC.value).toBe(valueC);

  expect(nodeA.children).toContainEqual(nodeB);
  expect(nodeA.children).toContainEqual(nodeC);
  expect(nodeA.children.length).toBe(2);
  expect(nodeB.children.length).toBe(0);
  expect(nodeC.children.length).toBe(0);
});

test('Links children using the `children` property', () => {
  const valueA = 'A';
  const valueB = 'B';
  const valueC = 'C';

  const nodeA = new TreeNode(valueA);
  const nodeB = new TreeNode(valueB);
  const nodeC = new TreeNode(valueC);

  nodeA.children.push(nodeB, nodeC);

  expect(nodeA.value).toBe(valueA);
  expect(nodeB.value).toBe(valueB);
  expect(nodeC.value).toBe(valueC);

  expect(nodeA.children).toContainEqual(nodeB);
  expect(nodeA.children).toContainEqual(nodeC);
  expect(nodeA.children.length).toBe(2);
  expect(nodeB.children.length).toBe(0);
  expect(nodeC.children.length).toBe(0);
});
