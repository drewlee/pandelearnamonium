import BinarySearchTree from '../src/binary-search-tree.ts';

describe('Instantiation', () => {
  test('Instantiates a tree with defaults', () => {
    const value = 7;
    const tree = new BinarySearchTree<number>(value);

    expect(tree).toBeInstanceOf(BinarySearchTree);
    expect(tree.value).toBe(value);
    expect(tree.left).toBeNull();
    expect(tree.right).toBeNull();
  });

  test('Instantiates a tree with `null` value', () => {
    const tree = new BinarySearchTree();

    expect(tree).toBeInstanceOf(BinarySearchTree);
    expect(tree.value).toBeNull();
    expect(tree.left).toBeNull();
    expect(tree.right).toBeNull();
  });

  test('Assigns the value after instantiation', () => {
    const value = 7;
    const tree = new BinarySearchTree<number>();
    tree.insert(value);

    expect(tree.value).toBe(value);
    expect(tree.left).toBeNull();
    expect(tree.right).toBeNull();
  });
});

describe('Insertion', () => {
  test('Inserts a lesser than value to be the left child', () => {
    const value = 7;
    const tree = new BinarySearchTree<number>(value);
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
    const tree = new BinarySearchTree<number>(value);
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
    const tree = new BinarySearchTree<number>(value);
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
    const tree = new BinarySearchTree<number>(value);
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
});

describe('Traversal', () => {
  test('Outputs traversal info', () => {
    const value = 4;
    const tree = new BinarySearchTree<number>(value);

    const values = [2, 6, 1, 3, 5, 7];
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
          "Value = 4, depth = 1",
        ],
        [
          "Value = 5, depth = 3",
        ],
        [
          "Value = 6, depth = 2",
        ],
        [
          "Value = 7, depth = 3",
        ],
      ]
    `);

    spy.mockRestore();
  });
});

describe('Search', () => {
  test('Returns the root node when calling `getNodeByValue`', () => {
    const value = 5;
    const tree = new BinarySearchTree<number>(value);
    const node = tree.getNodeByValue(value);

    expect(node).toBeInstanceOf(BinarySearchTree);
    expect(node?.value).toBe(value);
  });

  test('Returns the expected node when calling `getNodeByValue`', () => {
    const value = 5;
    const tree = new BinarySearchTree<number>(value);
    const values = [2, 7, 1, 3, 10];

    values.forEach((value) => tree.insert(value));

    const target = values[values.length - 1];
    const node = tree.getNodeByValue(target);

    expect(node).toBeInstanceOf(BinarySearchTree);
    expect(node?.value).toBe(target);
  });

  test('Returns `null` when the target node is not found', () => {
    const value = 5;
    const tree = new BinarySearchTree<number>(value);
    const values = [2, 7, 1, 3, 10];

    values.forEach((value) => tree.insert(value));

    const node = tree.getNodeByValue(15);
    expect(node).toBeNull();
  });
});

describe('Min and max search', () => {
  test('Gets the minimum value in the binary search tree', () => {
    const value = 5;
    const tree = new BinarySearchTree<number>(value);
    const values = [2, 7, 1, 3, 10];

    values.forEach((value) => tree.insert(value));

    const result = tree.getMin();
    expect(result).toBe(values[2]);
  });

  test('Gets the maximum value in the binary search tree', () => {
    const value = 5;
    const tree = new BinarySearchTree<number>(value);
    const values = [2, 7, 1, 3, 10];

    values.forEach((value) => tree.insert(value));

    const result = tree.getMax();
    expect(result).toBe(values[4]);
  });
});

describe('Deletion', () => {
  test('Does not alter the tree for a non-existing value', () => {
    const value = 4;
    const tree = new BinarySearchTree<number>(value);

    const values = [2, 6, 1, 3, 5, 7];
    values.forEach((value) => tree.insert(value));

    const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
    tree.delete(11);
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
          "Value = 4, depth = 1",
        ],
        [
          "Value = 5, depth = 3",
        ],
        [
          "Value = 6, depth = 2",
        ],
        [
          "Value = 7, depth = 3",
        ],
      ]
    `);

    spy.mockRestore();
  });
  describe('Leaf node deletion', () => {
    test('Removes a leaf node from the left branch', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [2, 6, 1, 3, 5, 7];
      values.forEach((value) => tree.insert(value));

      const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
      tree.delete(values[2]); // 1
      tree.depthFirstTraversal();

      expect(spy.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "Value = 2, depth = 2",
          ],
          [
            "Value = 3, depth = 3",
          ],
          [
            "Value = 4, depth = 1",
          ],
          [
            "Value = 5, depth = 3",
          ],
          [
            "Value = 6, depth = 2",
          ],
          [
            "Value = 7, depth = 3",
          ],
        ]
      `);

      const node = tree.getNodeByValue(values[0]); // 2
      expect(node?.left).toBeNull();
      expect(node?.right?.value).toBe(values[3]); // 3

      spy.mockRestore();
    });

    test('Removes a leaf node from the right branch', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [2, 6, 1, 3, 5, 7];
      values.forEach((value) => tree.insert(value));

      const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
      tree.delete(values[5]); // 7
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
            "Value = 4, depth = 1",
          ],
          [
            "Value = 5, depth = 3",
          ],
          [
            "Value = 6, depth = 2",
          ],
        ]
      `);

      const node = tree.getNodeByValue(values[1]); // 6
      expect(node?.left?.value).toBe(values[4]); // 5
      expect(node?.right).toBeNull(); // 3

      spy.mockRestore();
    });
  });

  describe('Single child node deletion', () => {
    test('Removes a node with a single left child from the left branch', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [2, 6, 1, 5, 7];
      values.forEach((value) => tree.insert(value));

      const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
      tree.delete(values[0]); // 2
      tree.depthFirstTraversal();

      expect(spy.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "Value = 1, depth = 2",
          ],
          [
            "Value = 4, depth = 1",
          ],
          [
            "Value = 5, depth = 3",
          ],
          [
            "Value = 6, depth = 2",
          ],
          [
            "Value = 7, depth = 3",
          ],
        ]
      `);

      const node = tree.left;
      expect(node?.value).toBe(values[2]); // 1
      expect(node?.left).toBeNull();
      expect(node?.right).toBeNull();

      spy.mockRestore();
    });

    test('Removes a node with a single right child from the left branch', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [2, 6, 3, 5, 7];
      values.forEach((value) => tree.insert(value));

      const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
      tree.delete(values[0]); // 2
      tree.depthFirstTraversal();

      expect(spy.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "Value = 3, depth = 2",
          ],
          [
            "Value = 4, depth = 1",
          ],
          [
            "Value = 5, depth = 3",
          ],
          [
            "Value = 6, depth = 2",
          ],
          [
            "Value = 7, depth = 3",
          ],
        ]
      `);

      const node = tree.left;
      expect(node?.value).toBe(values[2]); // 3
      expect(node?.left).toBeNull();
      expect(node?.right).toBeNull();

      spy.mockRestore();
    });

    test('Removes a node with a single left child from the right branch', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [2, 6, 1, 3, 5];
      values.forEach((value) => tree.insert(value));

      const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
      tree.delete(values[1]); // 6
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
            "Value = 4, depth = 1",
          ],
          [
            "Value = 5, depth = 2",
          ],
        ]
      `);

      const node = tree.right;
      expect(node?.value).toBe(values[4]); // 5
      expect(node?.left).toBeNull();
      expect(node?.right).toBeNull();

      spy.mockRestore();
    });

    test('Removes a node with a single right child from the right branch', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [2, 6, 1, 3, 7];
      values.forEach((value) => tree.insert(value));

      const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
      tree.delete(values[1]); // 6
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
            "Value = 4, depth = 1",
          ],
          [
            "Value = 7, depth = 2",
          ],
        ]
      `);

      const node = tree.right;
      expect(node?.value).toBe(values[4]); // 7
      expect(node?.left).toBeNull();
      expect(node?.right).toBeNull();

      spy.mockRestore();
    });
  });

  describe('Two child node deletion', () => {
    test('Removes a node with two children from the left branch', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [2, 6, 1, 3, 5, 7];
      values.forEach((value) => tree.insert(value));

      const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
      tree.delete(values[0]); // 2
      tree.depthFirstTraversal();

      expect(spy.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "Value = 1, depth = 3",
          ],
          [
            "Value = 3, depth = 2",
          ],
          [
            "Value = 4, depth = 1",
          ],
          [
            "Value = 5, depth = 3",
          ],
          [
            "Value = 6, depth = 2",
          ],
          [
            "Value = 7, depth = 3",
          ],
        ]
      `);

      const node = tree.left;
      expect(node?.value).toBe(values[3]); // 3
      expect(node?.left?.value).toBe(values[2]); // 1
      expect(node?.right).toBeNull();

      spy.mockRestore();
    });

    test('Removes a node with two children from the right branch', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [2, 6, 1, 3, 5, 7];
      values.forEach((value) => tree.insert(value));

      const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
      tree.delete(values[1]); // 6
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
            "Value = 4, depth = 1",
          ],
          [
            "Value = 5, depth = 3",
          ],
          [
            "Value = 7, depth = 2",
          ],
        ]
      `);

      const node = tree.right;
      expect(node?.value).toBe(values[5]); // 7
      expect(node?.left?.value).toBe(values[4]); // 5
      expect(node?.right).toBeNull();

      spy.mockRestore();
    });
  });

  describe('Root node deletion', () => {
    test('Removes the root for a tree with no children', () => {
      const value = 11;
      const tree = new BinarySearchTree<number>(value);

      tree.delete(11);

      expect(tree.value).toBeNull();
      expect(tree.left).toBeNull();
      expect(tree.right).toBeNull();
    });

    test('Removes the root for a tree with a single left branch', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [2, 1, 3];
      values.forEach((value) => tree.insert(value));

      tree.delete(value);
      expect(tree.value).toBe(values[0]); // 2
      expect(tree.left?.value).toBe(values[1]); // 1
      expect(tree.right?.value).toBe(values[2]); // 3
    });

    test('Removes the root for a tree with a single right branch', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [6, 5, 7];
      values.forEach((value) => tree.insert(value));

      tree.delete(value);

      expect(tree.value).toBe(values[0]);
      expect(tree.left?.value).toBe(values[1]);
      expect(tree.right?.value).toBe(values[2]);
    });

    test('Removes the root for a tree with both branches', () => {
      const value = 4;
      const tree = new BinarySearchTree<number>(value);

      const values = [2, 6, 1, 3, 5, 7];
      values.forEach((value) => tree.insert(value));

      const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
      tree.delete(value);
      tree.depthFirstTraversal();

      expect(tree.value).toBe(values[4]); // 5
      expect(tree.left?.value).toBe(values[0]); // 2
      expect(tree.right?.value).toBe(values[1]); // 6
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
            "Value = 6, depth = 2",
          ],
          [
            "Value = 7, depth = 3",
          ],
        ]
      `);

      spy.mockRestore();
    });
  });
});
