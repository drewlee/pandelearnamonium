/**
 * The red-black tree node is the underlying data structure for constructing red-black trees (RBTs).
 * RBTs are binary search trees with self-rebalancing capabilities. RBT nodes include additional
 * properties over BSTs:
 * - A reference to the parent node.
 * - The color of the node (red or black), expressed with a boolean.
 */
export default class RBTNode<T extends bigint | number | string> {
  value: T | null;
  left: RBTNode<T> | null;
  right: RBTNode<T> | null;
  parent: RBTNode<T> | null;
  isRed: boolean;

  constructor(value: T | null = null) {
    this.value = value;
    this.right = null;
    this.left = null;
    this.parent = null;
    this.isRed = false;
  }
}
