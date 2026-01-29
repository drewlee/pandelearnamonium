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

  [nodes[0], nodes[2], nodes[4]].forEach((node) => {
    node.left = tree.nil;
    node.right = tree.nil;
  });

  nodes[1].parent = tree.nil;
  nodes[1].left = nodes[0];
  nodes[1].right = nodes[3];

  nodes[0].parent = nodes[1];

  nodes[3].parent = nodes[1];
  nodes[3].left = nodes[2];
  nodes[3].right = nodes[4];

  nodes[2].parent = nodes[3];
  nodes[4].parent = nodes[3];

  tree.root = nodes[1];

  expect(traverseRBTInOrder(tree)).toMatchInlineSnapshot(`
    [
      {
        "depth": 1,
        "value": 1,
      },
      {
        "depth": 0,
        "value": 2,
      },
      {
        "depth": 2,
        "value": 3,
      },
      {
        "depth": 1,
        "value": 4,
      },
      {
        "depth": 2,
        "value": 5,
      },
    ]
  `);

  tree.rotateLeft(tree.root);

  expect(traverseRBTInOrder(tree)).toMatchInlineSnapshot(`
    [
      {
        "depth": 2,
        "value": 1,
      },
      {
        "depth": 1,
        "value": 2,
      },
      {
        "depth": 2,
        "value": 3,
      },
      {
        "depth": 0,
        "value": 4,
      },
      {
        "depth": 1,
        "value": 5,
      },
    ]
  `);
});

test.skip('Rotates the pivot node right', () => {
  //
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
  const tree = new RedBlackTree();

  tree.insert(values[0]);
  tree.insert(values[1]);

  expect(tree.root.value).toBe(values[0]);
  expect(tree.root.isRed).toBeFalsy();
  expect(tree.root.parent).toBe(tree.nil);
  expect(tree.root.left).toBe(tree.nil);
  expect(tree.root.right?.value).toBe(values[1]);
});
