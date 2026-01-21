import BinarySearchTree from '../src/binary-search-tree.ts';

test('Instantiates a new tree', () => {
  const value = 7;
  const tree = new BinarySearchTree(value);

  expect(tree).toBeInstanceOf(BinarySearchTree);
  expect(tree.value).toBe(value);
  expect(tree.left).toBeNull();
  expect(tree.right).toBeNull();
});

test('Inserts a lesser than value to be the left child', () => {
  const value = 7;
  const tree = new BinarySearchTree(value);
  const leftValue = 4;

  tree.insert(leftValue);

  expect(tree.value).toBe(value);
  expect(tree.left).not.toBeNull();
  expect(tree.left).toBeInstanceOf(BinarySearchTree);
  expect(tree.left?.value).toBe(leftValue);
  expect(tree.right).toBeNull();
});

test('Inserts a greater than value to be the right child', () => {
  const value = 7;
  const tree = new BinarySearchTree(value);
  const rightValue = 10;

  tree.insert(rightValue);

  expect(tree.value).toBe(value);
  expect(tree.left).toBeNull();
  expect(tree.right).not.toBeNull();
  expect(tree.right).toBeInstanceOf(BinarySearchTree);
  expect(tree.right?.value).toBe(rightValue);
});

test('Inserts a duplicate value to be the right child', () => {
  const value = 7;
  const tree = new BinarySearchTree(value);
  const rightValue = 7;

  tree.insert(rightValue);

  expect(tree.value).toBe(value);
  expect(tree.left).toBeNull();
  expect(tree.right).not.toBeNull();
  expect(tree.right).toBeInstanceOf(BinarySearchTree);
  expect(tree.right?.value).toBe(rightValue);
});

test('Creates a tree recursively', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [2, 7, 1, 3, 10];

  /*
       5
      / \
     2   7
    / \   \
   1   3   10
  */

  values.forEach((value) => tree.insert(value));

  expect(tree.value).toBe(value);
  expect(tree.left?.value).toBe(values[0]);
  expect(tree.right?.value).toBe(values[1]);
  expect(tree.left?.left?.value).toBe(values[2]);
  expect(tree.left?.right?.value).toBe(values[3]);
  expect(tree.right?.left).toBeNull();
  expect(tree.right?.right?.value).toBe(values[4]);
});

test('Outputs traversal info', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [2, 7, 1, 3, 10];

  /*
       5
      / \
     2   7
    / \   \
   1   3   10
  */

  values.forEach((value) => tree.insert(value));

  const spy = vi.spyOn(console, 'log').mockImplementation(() => null);

  tree.depthFirstTraversal();

  expect(spy.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "Value = 1, depth = 3",
      ],
      [
        "Value = 2, depth = 2",
      ],
      [
        "Value = 3, depth = 3",
      ],
      [
        "Value = 5, depth = 1",
      ],
      [
        "Value = 7, depth = 2",
      ],
      [
        "Value = 10, depth = 3",
      ],
    ]
  `);

  spy.mockRestore();
});

test('Returns the root node when calling `getNodeByValue`', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const node = tree.getNodeByValue(value);

  expect(node).toBeInstanceOf(BinarySearchTree);
  expect(node?.value).toBe(value);
});

test('Returns the expected node when calling `getNodeByValue`', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [2, 7, 1, 3, 10];

  values.forEach((value) => tree.insert(value));

  const target = values[values.length - 1];
  const node = tree.getNodeByValue(target);

  expect(node).toBeInstanceOf(BinarySearchTree);
  expect(node?.value).toBe(target);
});

test('Returns `null` when the target node is not found', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [2, 7, 1, 3, 10];

  values.forEach((value) => tree.insert(value));

  const node = tree.getNodeByValue(15);
  expect(node).toBeNull();
});

test('Gets the minimum value in the binary search tree', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [2, 7, 1, 3, 10];

  values.forEach((value) => tree.insert(value));

  const result = tree.getMin();
  expect(result).toBe(values[2]);
});

test('Gets the maximum value in the binary search tree', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [2, 7, 1, 3, 10];

  values.forEach((value) => tree.insert(value));

  const result = tree.getMax();
  expect(result).toBe(values[4]);
});

test('Removes a node with no children from the left branch', () => {
  const value = 2;
  const tree = new BinarySearchTree(value);
  const values = [1, 3];

  values.forEach((value) => tree.insert(value));

  const result = tree.delete(values[0]);

  expect(result?.value).toBe(values[0]);
  expect(result?.left).toBeNull();
  expect(result?.right).toBeNull();

  expect(tree.left).toBeNull();
  expect(tree.right?.value).toBe(values[1]);
});

test('Removes a node with no children from the right branch', () => {
  const value = 2;
  const tree = new BinarySearchTree(value);
  const values = [1, 3];

  values.forEach((value) => tree.insert(value));

  const result = tree.delete(values[1]);

  expect(result?.value).toBe(values[1]);
  expect(result?.left).toBeNull();
  expect(result?.right).toBeNull();

  expect(tree.left?.value).toBe(values[0]);
  expect(tree.right).toBeNull();
});

test('Removes a node with a single left child from the left branch', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [3, 1, 9];

  values.forEach((value) => tree.insert(value));

  const result = tree.delete(values[0]);

  expect(result?.value).toBe(values[0]);
  expect(result?.left).toBeNull();
  expect(result?.right).toBeNull();

  expect(tree.left?.value).toBe(values[1]);
  expect(tree.right?.value).toBe(values[2]);
});

test('Removes a node with a single right child from the left branch', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [3, 4, 9];

  values.forEach((value) => tree.insert(value));

  const result = tree.delete(values[0]);

  expect(result?.value).toBe(values[0]);
  expect(result?.left).toBeNull();
  expect(result?.right).toBeNull();

  expect(tree.left?.value).toBe(values[1]);
  expect(tree.right?.value).toBe(values[2]);
});

test('Removes a node with a single left child from the right branch', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [3, 7, 6];

  values.forEach((value) => tree.insert(value));

  const result = tree.delete(values[1]);

  expect(result?.value).toBe(values[1]);
  expect(result?.left).toBeNull();
  expect(result?.right).toBeNull();

  expect(tree.left?.value).toBe(values[0]);
  expect(tree.right?.value).toBe(values[2]);
});

test('Removes a node with a single right child from the right branch', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [3, 7, 9];

  values.forEach((value) => tree.insert(value));

  const result = tree.delete(values[1]);

  expect(result?.value).toBe(values[1]);
  expect(result?.left).toBeNull();
  expect(result?.right).toBeNull();

  expect(tree.left?.value).toBe(values[0]);
  expect(tree.right?.value).toBe(values[2]);
});

test('Removes a node with two children from the left branch', () => {
  const value = 5;
  const tree = new BinarySearchTree(value);
  const values = [3, 1, 4, 9];

  values.forEach((value) => tree.insert(value));

  const result = tree.delete(values[0]);

  expect(result?.value).toBe(values[0]);
  expect(result?.left).toBeNull();
  expect(result?.right).toBeNull();

  expect(tree.left?.value).toBe(values[2]);
  expect(tree.left?.left?.value).toBe(values[1]);
  expect(tree.left?.right).toBeNull();

  expect(tree.right?.value).toBe(values[3]);
});

test('Removes a node with two children from the left branch: complex', () => {
  const value = 7;
  const tree = new BinarySearchTree(value);
  const values = [4, 3, 5, 6, 9];

  values.forEach((value) => tree.insert(value));

  const result = tree.delete(values[0]);

  expect(result?.value).toBe(values[0]);
  expect(result?.left).toBeNull();
  expect(result?.right).toBeNull();

  expect(tree.left?.value).toBe(values[2]);
  expect(tree.left?.left?.value).toBe(values[1]);
  expect(tree.left?.right?.value).toBe(values[3]);

  expect(tree.right?.value).toBe(values[4]);
});

test.skip('Removes the root for a tree with a single left branch', () => {
  const value = 2;
  const tree = new BinarySearchTree(value);

  tree.insert(1);

  const result = tree.delete(2);

  expect(result?.value).toBe(value);
  expect(result?.left).toBeNull();
  expect(result?.right).toBeNull();

  expect(tree.value).toBe(1);
});

test('Returns `null` when the value to delete is not found', () => {
  const value = 7;
  const tree = new BinarySearchTree(value);
  const values = [4, 3, 5, 6, 9];

  values.forEach((value) => tree.insert(value));

  const result = tree.delete(2);

  expect(result).toBeNull();
});
