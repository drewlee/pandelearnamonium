import TreeNode from '../../src/tree-node.ts';

/**
 * A utility function to construct a node tree from the given array of values.
 *
 * @param values - An array of values to use for each node of the tree.
 * @param childLimit - The maximum number of children to use for each node. Defaults to 2.
 * @returns The root node of the created tree.
 */
export default function buildTreeFromValues<T>(values: T[], childLimit = 2): TreeNode<T> {
  if (!values.length) {
    throw new Error('Empty array provided for the values parameter');
  }

  const queue: TreeNode<T>[] = [];
  const root = new TreeNode(values[0]);
  let current: TreeNode<T> | undefined = root;

  for (let i = 1; i < values.length; i++) {
    const node = new TreeNode(values[i]);
    queue.unshift(node);

    if (current.children.length >= childLimit) {
      current = queue.pop();

      if (!current) {
        break;
      }
    }

    current.children.push(node);
  }

  return root;
}
