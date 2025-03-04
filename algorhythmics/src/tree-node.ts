/**
 * A tree node is the basic data structure for generic trees. This is a minimal implementation, but
 * more in-depth classes usually include methods to add a child, remove a child, and traverse the
 * children of the current node.
 */
export default class TreeNode<T> {
  value: T;
  children: TreeNode<T>[];

  /**
   * Class constructor.
   *
   * @param value - The value to set for the node.
   * @param children - The child nodes to link to.
   */
  constructor(value: T, children: TreeNode<T>[] = []) {
    this.value = value;
    this.children = children;
  }
}
