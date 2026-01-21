import TreeNode from './nodes/tree-node.js';

/**
 * Searches a tree for the node with the specified value using the `Breadth-First Search` algorithm.
 * O(V) time, where V is the number of vertices (nodes).
 * O(V) space, where V is the number of vertices (nodes).
 *
 * @param root - The root of the tree to search in.
 * @param target - The target value to find.
 * @param debug - Whether to output debug logging info, primarily used for testing.
 * @returns The node with the specified value or `null` if it isn't found.
 */
export function breadthFirstSearch<T>(
  root: TreeNode<T>,
  target: T,
  debug = false,
): TreeNode<T> | null {
  const queue = [root];

  while (queue.length > 0) {
    const current = queue.pop()!;
    const { value } = current;

    if (debug) {
      console.log(`Visiting node with value ${String(value)}`);
    }

    if (value === target) {
      return current;
    }

    for (const child of current.children) {
      queue.unshift(child);
    }
  }

  return null;
}

/**
 * Searches a tree for the node with the specified value using the `Breadth-First Search` algorithm.
 * This implementation returns the path of the node instead of just the node itself.
 * O(V) time, where V is the number of vertices (nodes).
 * O(V) space, where V is the number of vertices (nodes).
 *
 * @param root - The root of the tree to search in.
 * @param target - The target value to find.
 * @param debug - Whether to output debug logging.
 * @returns The path of the node with the specified value or `null` if it isn't found.
 */
export function breadthFirstSearchWithPath<T>(
  root: TreeNode<T>,
  target: T,
  debug = false,
): TreeNode<T>[] | null {
  const queue = [[root]];

  while (queue.length > 0) {
    const current = queue.pop()!;
    const node = current[current.length - 1];
    const { value } = node;

    if (debug) {
      console.log(`Visiting node with value ${String(value)} at depth ${String(current.length)}`);
    }

    if (value === target) {
      return current;
    }

    for (const child of node.children) {
      queue.unshift([...current, child]);
    }
  }

  return null;
}
