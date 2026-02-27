import RedBlackTree from '../src/red-black-tree.ts';
import RBTNode from '../src/nodes/rbt-node.ts';
import { traverseRBTInOrder } from './helpers/traverse-rbt-inorder.ts';

test('Instantiates a tree with defaults', () => {
  const tree = new RedBlackTree();

  expect(tree.nil).toBeInstanceOf(RBTNode);
  expect(tree.root).toBeInstanceOf(RBTNode);
  expect(tree.root).toBe(tree.nil);
});

test('Nil node has the expected properties', () => {
  const tree = new RedBlackTree();

  expect(tree.nil.value).toBeNull();
  expect(tree.nil.isRed).toBeFalsy();
  expect(tree.nil.parent).toBeNull();
  expect(tree.nil.left).toBeNull();
  expect(tree.nil.right).toBeNull();
});

test('Rotates the pivot node left', () => {
  const values = [1, 2, 3, 4, 5];
  const nodes = values.map((value) => new RBTNode(value));
  const tree = new RedBlackTree<number>();

  // Nodes with no children
  [nodes[0], nodes[2], nodes[4]].forEach((node) => {
    node.left = tree.nil;
    node.right = tree.nil;
  });

  tree.root = nodes[1];
  nodes[1].parent = tree.nil;
  nodes[1].left = nodes[0];
  nodes[1].right = nodes[3];

  nodes[0].parent = nodes[1];

  nodes[3].parent = nodes[1];
  nodes[3].left = nodes[2];
  nodes[3].right = nodes[4];

  nodes[2].parent = nodes[3];
  nodes[4].parent = nodes[3];

  expect(traverseRBTInOrder(tree)).toMatchInlineSnapshot(`
    [
      {
        "color": "black",
        "depth": 1,
        "value": 1,
      },
      {
        "color": "black",
        "depth": 0,
        "value": 2,
      },
      {
        "color": "black",
        "depth": 2,
        "value": 3,
      },
      {
        "color": "black",
        "depth": 1,
        "value": 4,
      },
      {
        "color": "black",
        "depth": 2,
        "value": 5,
      },
    ]
  `);

  tree.rotateLeft(tree.root);

  expect(traverseRBTInOrder(tree)).toMatchInlineSnapshot(`
    [
      {
        "color": "black",
        "depth": 2,
        "value": 1,
      },
      {
        "color": "black",
        "depth": 1,
        "value": 2,
      },
      {
        "color": "black",
        "depth": 2,
        "value": 3,
      },
      {
        "color": "black",
        "depth": 0,
        "value": 4,
      },
      {
        "color": "black",
        "depth": 1,
        "value": 5,
      },
    ]
  `);
});

test('Rotates the pivot node right', () => {
  const values = [1, 2, 3, 4, 5];
  const nodes = values.map((value) => new RBTNode(value));
  const tree = new RedBlackTree<number>();

  // Nodes with no children
  [nodes[0], nodes[2], nodes[4]].forEach((node) => {
    node.left = tree.nil;
    node.right = tree.nil;
  });

  // Root (4)
  tree.root = nodes[3]; // 4
  nodes[3].parent = tree.nil;
  nodes[3].left = nodes[1]; // 2
  nodes[3].right = nodes[4]; // 5

  // Root's left (2)
  nodes[1].parent = nodes[3]; // 4
  nodes[1].left = nodes[0]; // 1
  nodes[1].right = nodes[2]; // 3

  // Root's right (5)
  nodes[4].parent = nodes[3]; // 4

  // Root's left left (1)
  nodes[0].parent = nodes[1]; // 2
  // Root's left right (3)
  nodes[2].parent = nodes[1]; // 2

  expect(tree.root.right!.left).toBe(tree.nil);
  expect(tree.root.right!.right).toBe(tree.nil);
  expect(tree.root.left!.left!.left).toBe(tree.nil);
  expect(tree.root.left!.left!.right).toBe(tree.nil);
  expect(tree.root.left!.right!.left).toBe(tree.nil);
  expect(tree.root.left!.right!.right).toBe(tree.nil);

  expect(traverseRBTInOrder(tree)).toMatchInlineSnapshot(`
    [
      {
        "color": "black",
        "depth": 2,
        "value": 1,
      },
      {
        "color": "black",
        "depth": 1,
        "value": 2,
      },
      {
        "color": "black",
        "depth": 2,
        "value": 3,
      },
      {
        "color": "black",
        "depth": 0,
        "value": 4,
      },
      {
        "color": "black",
        "depth": 1,
        "value": 5,
      },
    ]
  `);

  tree.rotateRight(tree.root);

  expect(traverseRBTInOrder(tree)).toMatchInlineSnapshot(`
    [
      {
        "color": "black",
        "depth": 1,
        "value": 1,
      },
      {
        "color": "black",
        "depth": 0,
        "value": 2,
      },
      {
        "color": "black",
        "depth": 2,
        "value": 3,
      },
      {
        "color": "black",
        "depth": 1,
        "value": 4,
      },
      {
        "color": "black",
        "depth": 2,
        "value": 5,
      },
    ]
  `);
});

test('Inserting an initial value sets the root', () => {
  const value = 11;
  const tree = new RedBlackTree<number>();

  tree.insert(value);

  expect(tree.root.value).toBe(value);
  expect(tree.root.isRed).toBeFalsy();
  expect(tree.root.parent).toBe(tree.nil);
  expect(tree.root.left).toBe(tree.nil);
  expect(tree.root.right).toBe(tree.nil);
});

test('Inserts a left child to the root', () => {
  const values = [11, 3];
  const tree = new RedBlackTree<number>();

  tree.insert(values[0]);
  tree.insert(values[1]);

  expect(tree.root.value).toBe(values[0]);
  expect(tree.root.isRed).toBeFalsy();
  expect(tree.root.parent).toBe(tree.nil);
  expect(tree.root.left?.value).toBe(values[1]);
  expect(tree.root.right).toBe(tree.nil);
});

test('Inserts a right child to the root', () => {
  const values = [11, 17];
  const tree = new RedBlackTree<number>();

  tree.insert(values[0]);
  tree.insert(values[1]);

  expect(tree.root.value).toBe(values[0]);
  expect(tree.root.isRed).toBeFalsy();
  expect(tree.root.parent).toBe(tree.nil);
  expect(tree.root.left).toBe(tree.nil);
  expect(tree.root.right?.value).toBe(values[1]);
});

test('Ensures balance with incremental insertions', () => {
  const values = [1, 2, 3, 4, 5, 6, 7];
  const tree = new RedBlackTree<number>();

  values.forEach((value) => tree.insert(value));

  expect(traverseRBTInOrder(tree)).toMatchInlineSnapshot(`
    [
      {
        "color": "black",
        "depth": 1,
        "value": 1,
      },
      {
        "color": "black",
        "depth": 0,
        "value": 2,
      },
      {
        "color": "black",
        "depth": 2,
        "value": 3,
      },
      {
        "color": "red",
        "depth": 1,
        "value": 4,
      },
      {
        "color": "red",
        "depth": 3,
        "value": 5,
      },
      {
        "color": "black",
        "depth": 2,
        "value": 6,
      },
      {
        "color": "red",
        "depth": 3,
        "value": 7,
      },
    ]
  `);
});

test('Ensure balance with decremental insertions', () => {
  const values = [7, 6, 5, 4, 3, 2, 1];
  const tree = new RedBlackTree<number>();

  values.forEach((value) => tree.insert(value));

  expect(traverseRBTInOrder(tree)).toMatchInlineSnapshot(`
    [
      {
        "color": "red",
        "depth": 3,
        "value": 1,
      },
      {
        "color": "black",
        "depth": 2,
        "value": 2,
      },
      {
        "color": "red",
        "depth": 3,
        "value": 3,
      },
      {
        "color": "red",
        "depth": 1,
        "value": 4,
      },
      {
        "color": "black",
        "depth": 2,
        "value": 5,
      },
      {
        "color": "black",
        "depth": 0,
        "value": 6,
      },
      {
        "color": "black",
        "depth": 1,
        "value": 7,
      },
    ]
  `);
});
