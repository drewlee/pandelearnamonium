import TreeNode from './tree-node.js';

/**
 * Searches a tree for the node with the specified value using the `Depth-First Search` algorithm.
 * O(V) time, where V is the number of vertices (nodes).
 * O(V) space, where V is the number of vertices (nodes).
 *
 * @param root - The root of the tree to search in.
 * @param target - The target value to find.
 * @param debug - Whether to output debug logging info, primarily used for testing.
 * @returns The node with the specified value or `null` if it isn't found.
 */
export function depthFirstSearch<T>(
  root: TreeNode<T>,
  target: T,
  debug = false,
): TreeNode<T> | null {
  const stack = [root];

  while (stack.length > 0) {
    const current = stack.pop()!;
    const { children, value } = current;

    if (debug) {
      console.log(`Visiting node with value ${String(value)}`);
    }

    if (value === target) {
      return current;
    }

    // Push nodes starting from the back of the array
    // so that traversal starts on the left-most branch.
    for (let i = children.length - 1; i >= 0; i--) {
      stack.push(children[i]);
    }
  }

  return null;
}

/**
 * Searches a tree for the node with the specified value using the `Depth-First Search` algorithm.
 * This implementation returns the path of the node instead of just the node itself.
 * O(V) time, where V is the number of vertices (nodes).
 * O(V) space, where V is the number of vertices (nodes).
 *
 * @param root - The root of the tree to search in.
 * @param target - The target value to find.
 * @param debug - Whether to output debug logging info, primarily used for testing.
 * @returns The node with the specified value or `null` if it isn't found.
 */
export function depthFirstSearchWithPath<T>(
  root: TreeNode<T>,
  target: T,
  debug = false,
): TreeNode<T>[] | null {
  const stack = [[root]];

  while (stack.length > 0) {
    const current = stack.pop()!;
    const { children, value } = current[current.length - 1];

    if (debug) {
      console.log(`Visiting node with value ${String(value)} at depth ${current.length}`);
    }

    if (value === target) {
      return current;
    }

    // Push nodes starting from the back of the array
    // so that traversal starts on the left-most branch.
    for (let i = children.length - 1; i >= 0; i--) {
      stack.push([...current, children[i]]);
    }
  }

  return null;
}

/**
 * Recursively searches a tree for the node with the specified value using the `Depth-First Search` algorithm.
 * O(V) time, where V is the number of vertices (nodes).
 * O(V) space, where V is the number of vertices (nodes).
 *
 * @param root - The root of the tree to search in.
 * @param target - The target value to find.
 * @param debug - Whether to output debug logging info, primarily used for testing.
 * @returns The node with the specified value or `null` if it isn't found.
 */
export function depthFirstSearchRecursive<T>(
  root: TreeNode<T>,
  target: T,
  debug = false,
): TreeNode<T> | null {
  const { value } = root;

  if (debug) {
    console.log(`Visiting node with value ${String(value)}`);
  }

  if (value === target) {
    return root;
  }

  for (const child of root.children) {
    const result = depthFirstSearchRecursive(child, target, debug);

    if (result !== null) {
      return result;
    }
  }

  return null;
}

/**
 * Recursively searches a tree for the node with the specified value using the `Depth-First Search` algorithm.
 * This implementation returns the path of the node instead of just the node itself.
 * O(V) time, where V is the number of vertices (nodes).
 * O(V) space, where V is the number of vertices (nodes).
 *
 * @param root - The root of the tree to search in.
 * @param target - The target value to find.
 * @param debug - Whether to output debug logging info, primarily used for testing.
 * @returns The node with the specified value or `null` if it isn't found.
 */
export function depthFirstSearchRecursiveWithPath<T>(
  root: TreeNode<T> | TreeNode<T>[],
  target: T,
  debug = false,
): TreeNode<T>[] | null {
  const path = Array.isArray(root) ? root : [root];
  const { children, value } = path[path.length - 1];

  if (debug) {
    console.log(`Visiting node with value ${String(value)} at depth ${path.length}`);
  }

  if (value === target) {
    return path;
  }

  for (const child of children) {
    const result = depthFirstSearchRecursiveWithPath([...path, child], target, debug);

    if (result !== null) {
      return result;
    }
  }

  return null;
}
