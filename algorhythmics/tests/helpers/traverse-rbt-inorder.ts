import RBTNode from '../../src/nodes/rbt-node.ts';
import RedBlackTree from '../../src/red-black-tree.ts';

interface RBTRecord<T extends bigint | number | string> {
  value: T;
  depth: number;
}

/**
 * Recursively traverses, in-order, the nodes of a red-black tree, starting from the specified node.
 * Stores the value and depth of each visited node.
 *
 * @param node - Red-black tree node to traverse from.
 * @param tree - The red-black tree the node is a member of.
 * @param values - Collection of properties stored from each visited node.
 * @param depth - Current depth in the tree.
 */
function traverseNodes<T extends bigint | number | string>(
  node: RBTNode<T>,
  tree: RedBlackTree<T>,
  values: RBTRecord<T>[],
  depth = 0,
): void {
  if (node.left !== tree.nil) {
    traverseNodes(node.left!, tree, values, depth + 1);
  }

  values.push({
    value: node.value!,
    depth,
  });

  if (node.right !== tree.nil) {
    traverseNodes(node.right!, tree, values, depth + 1);
  }
}

/**
 * Traverses, in-order, the nodes of the specified red-black tree. Returns a collection of values
 * from each visited node used to assert the tree structure in tests.
 *
 * @param tree - Red-black tree to traverse.
 * @returns A collection of values from each visited node.
 */
export function traverseRBTInOrder<T extends bigint | number | string>(
  tree: RedBlackTree<T>,
): RBTRecord<T>[] {
  const values: RBTRecord<T>[] = [];

  if (!tree || tree.root === tree.nil) {
    return values;
  }

  traverseNodes(tree.root, tree, values, 0);

  return values;
}
