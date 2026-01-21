import TreeNode from '../../src/nodes/tree-node.ts';

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
    // Create a node for the current value and push it to the end of the queue
    const node = new TreeNode(values[i]);
    queue.push(node);

    // If the current child limit has been met, get a node from the front of the queue
    if (current.children.length >= childLimit) {
      current = queue.shift();

      if (!current) {
        break;
      }
    }

    // Add the new node as a child of the current node
    current.children.push(node);
  }

  return root;
}
