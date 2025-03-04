import buildTreeFromValues from './build-tree-from-values';

test('Throws error when an empty array is provided', () => {
  expect(() => buildTreeFromValues([])).toThrowError(
    'Empty array provided for the values parameter',
  );
});

test('Creates a node from a single element', () => {
  const root = buildTreeFromValues(['A']);

  expect(root.value).toBe('A');
  expect(root.children.length).toBe(0);
});

test('Creates an asymmetrical tree', () => {
  const root = buildTreeFromValues(['A', 'B']);

  expect(root.value).toBe('A');
  expect(root.children.length).toBe(1);
  expect(root.children[0].children.length).toBe(0);
  expect(root.children[0].value).toBe('B');
});

test('Creates a balanced tree', () => {
  const root = buildTreeFromValues(['A', 'B', 'C']);

  expect(root.value).toBe('A');
  expect(root.children.length).toBe(2);
  expect(root.children[0].children.length).toBe(0);
  expect(root.children[0].value).toBe('B');
  expect(root.children[1].children.length).toBe(0);
  expect(root.children[1].value).toBe('C');
});

test('Creates a multi-level tree', () => {
  const root = buildTreeFromValues(['A', 'B', 'C', 'D', 'E', 'F']);

  // Children of 'A'
  expect(root.children.length).toBe(2);
  expect(root.children[0].value).toBe('B');
  expect(root.children[1].value).toBe('C');

  // Children of 'B'
  expect(root.children[0].children.length).toBe(2);
  expect(root.children[0].children[0].value).toBe('D');
  expect(root.children[0].children[1].value).toBe('E');

  // Children of 'C'
  expect(root.children[1].children.length).toBe(1);
  expect(root.children[1].children[0].value).toBe('F');
});

test('Creates a tree with a custom number of children', () => {
  const root = buildTreeFromValues(['A', 'B', 'C', 'D', 'E'], 3);

  // Children of 'A'
  expect(root.children.length).toBe(3);
  expect(root.children[0].value).toBe('B');
  expect(root.children[1].value).toBe('C');
  expect(root.children[2].value).toBe('D');

  // Children of 'B'
  expect(root.children[0].children.length).toBe(1);
  expect(root.children[0].children[0].value).toBe('E');

  // Children of 'C'
  expect(root.children[1].children.length).toBe(0);

  // Children of 'D'
  expect(root.children[2].children.length).toBe(0);

  // Children of 'E'
  expect(root.children[0].children[0].children.length).toBe(0);
});
