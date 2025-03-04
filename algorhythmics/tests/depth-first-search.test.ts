import {
  depthFirstSearch,
  depthFirstSearchWithPath,
  depthFirstSearchRecursive,
  depthFirstSearchRecursiveWithPath,
} from '../src/depth-first-search.ts';
import buildTreeFromValues from './helpers/build-tree-from-values.ts';

describe('Depth-first search', () => {
  test('Returns the root node', () => {
    const root = buildTreeFromValues(['A']);
    const result = depthFirstSearch(root, 'A');

    expect(result).toStrictEqual(root);
  });

  test('Returns the target node', () => {
    const root = buildTreeFromValues(['A', 'B', 'C']);
    const nodeC = root.children[1];

    const result = depthFirstSearch(root, 'C');
    expect(result).toStrictEqual(nodeC);
  });

  test('Returns `null` when the target is not found', () => {
    const root = buildTreeFromValues(['A', 'B', 'C']);
    const result = depthFirstSearch(root, 'D');

    expect(result).toBeNull();
  });

  test('Traverses the tree in the expected order', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
    const values = ['A', 'B', 'C', 'D', 'E', 'F'];
    const root = buildTreeFromValues(values);

    depthFirstSearch(root, 'F', true);

    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Visiting node with value A",
        ],
        [
          "Visiting node with value B",
        ],
        [
          "Visiting node with value D",
        ],
        [
          "Visiting node with value E",
        ],
        [
          "Visiting node with value C",
        ],
        [
          "Visiting node with value F",
        ],
      ]
    `);

    spy.mockRestore();
  });
});

describe('Depth-first search with path', () => {
  test('Returns the path for the root node', () => {
    const root = buildTreeFromValues(['A']);
    const result = depthFirstSearchWithPath(root, 'A');

    expect(result).toStrictEqual([root]);
  });

  test('Returns the target node as the last item in the path', () => {
    const root = buildTreeFromValues(['A', 'B', 'C']);
    const nodeC = root.children[1];
    const path = depthFirstSearchWithPath(root, 'C')!;
    const result = path[path.length - 1];

    expect(result).toStrictEqual(nodeC);
  });

  test('Returns `null` when the target is not found', () => {
    const root = buildTreeFromValues(['A', 'B', 'C']);
    const result = depthFirstSearchWithPath(root, 'D');

    expect(result).toBeNull();
  });

  test('Traverses the tree in the expected order', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
    const values = ['A', 'B', 'C', 'D', 'E', 'F'];
    const root = buildTreeFromValues(values);

    depthFirstSearchWithPath(root, 'F', true);

    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Visiting node with value A at depth 1",
        ],
        [
          "Visiting node with value B at depth 2",
        ],
        [
          "Visiting node with value D at depth 3",
        ],
        [
          "Visiting node with value E at depth 3",
        ],
        [
          "Visiting node with value C at depth 2",
        ],
        [
          "Visiting node with value F at depth 3",
        ],
      ]
    `);

    spy.mockRestore();
  });

  test('Returns the path of the target node', () => {
    const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
    const root = buildTreeFromValues(values);
    const result = depthFirstSearchWithPath(root, 'O');

    const nodeC = root.children[1];
    const nodeG = nodeC.children[1];
    const nodeO = nodeG.children[1];

    expect(result).toStrictEqual([root, nodeC, nodeG, nodeO]);
  });
});

describe('Depth-first search recursive', () => {
  test('Returns the root node', () => {
    const root = buildTreeFromValues(['A']);
    const result = depthFirstSearchRecursive(root, 'A');

    expect(result).toStrictEqual(root);
  });

  test('Returns the target node', () => {
    const root = buildTreeFromValues(['A', 'B', 'C']);
    const nodeC = root.children[1];

    const result = depthFirstSearchRecursive(root, 'C');
    expect(result).toStrictEqual(nodeC);
  });

  test('Returns `null` when the target is not found', () => {
    const root = buildTreeFromValues(['A', 'B', 'C']);
    const result = depthFirstSearchRecursive(root, 'D');

    expect(result).toBeNull();
  });

  test('Traverses the tree in the expected order', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
    const values = ['A', 'B', 'C', 'D', 'E', 'F'];
    const root = buildTreeFromValues(values);

    depthFirstSearchRecursive(root, 'F', true);

    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Visiting node with value A",
        ],
        [
          "Visiting node with value B",
        ],
        [
          "Visiting node with value D",
        ],
        [
          "Visiting node with value E",
        ],
        [
          "Visiting node with value C",
        ],
        [
          "Visiting node with value F",
        ],
      ]
    `);

    spy.mockRestore();
  });
});

describe('Depth-first search recursive with path', () => {
  test('Returns the path for the root node', () => {
    const root = buildTreeFromValues(['A']);
    const result = depthFirstSearchRecursiveWithPath(root, 'A');

    expect(result).toStrictEqual([root]);
  });

  test('Returns the target node as the last item in the path', () => {
    const root = buildTreeFromValues(['A', 'B', 'C']);
    const nodeC = root.children[1];
    const path = depthFirstSearchRecursiveWithPath(root, 'C')!;
    const result = path[path.length - 1];

    expect(result).toStrictEqual(nodeC);
  });

  test('Returns `null` when the target is not found', () => {
    const root = buildTreeFromValues(['A', 'B', 'C']);
    const result = depthFirstSearchRecursiveWithPath(root, 'D');

    expect(result).toBeNull();
  });

  test('Traverses the tree in the expected order', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => null);
    const values = ['A', 'B', 'C', 'D', 'E', 'F'];
    const root = buildTreeFromValues(values);

    depthFirstSearchRecursiveWithPath(root, 'F', true);

    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Visiting node with value A at depth 1",
        ],
        [
          "Visiting node with value B at depth 2",
        ],
        [
          "Visiting node with value D at depth 3",
        ],
        [
          "Visiting node with value E at depth 3",
        ],
        [
          "Visiting node with value C at depth 2",
        ],
        [
          "Visiting node with value F at depth 3",
        ],
      ]
    `);

    spy.mockRestore();
  });

  test('Returns the path of the target node', () => {
    const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
    const root = buildTreeFromValues(values);
    const result = depthFirstSearchRecursiveWithPath(root, 'O');

    const nodeC = root.children[1];
    const nodeG = nodeC.children[1];
    const nodeO = nodeG.children[1];

    expect(result).toStrictEqual([root, nodeC, nodeG, nodeO]);
  });
});
