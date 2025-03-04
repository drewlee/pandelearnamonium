/**
 * A binary search tree is an efficient data structure for fast, O(log n), data storage and
 * retrieval. It is made up of a root node and at most two child branches, named `left` and `right`.
 */
export default class BinarySearchTree<T> {
  value: T;
  depth: number;
  left: BinarySearchTree<T> | null;
  right: BinarySearchTree<T> | null;

  /**
   * Class constructor.
   *
   * @param value - The value to set for the node.
   * @param depth - The node's level of depth. Defaults to `1`.
   */
  constructor(value: T, depth = 1) {
    this.value = value;
    this.depth = depth;
    this.left = null;
    this.right = null;
  }

  /**
   * Inserts a new node into the tree with the specified value.
   *
   * @param value - The value to set for the node.
   */
  insert(value: T): void {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BinarySearchTree(value, this.depth + 1);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(value, this.depth + 1);
      } else {
        this.right.insert(value);
      }
    }
  }

  /**
   * Searches and returns the node with the specified value.
   *
   * @param value - The target value.
   * @returns The node with the specified value, or `null` if it isn't found.
   */
  getNodeByValue(value: T): this | BinarySearchTree<T> | null {
    if (this.value === value) {
      return this;
    } else if (this.left !== null && value < this.value) {
      return this.left.getNodeByValue(value);
    } else if (this.right !== null && value >= this.value) {
      return this.right.getNodeByValue(value);
    }

    return null;
  }

  /**
   * Uses in-order traversal to log each node's value and level of depth.
   */
  depthFirstTraversal(): void {
    if (this.left !== null) {
      this.left.depthFirstTraversal();
    }

    console.log(`Value = ${String(this.value)}, depth = ${String(this.depth)}`);

    if (this.right !== null) {
      this.right.depthFirstTraversal();
    }
  }
}
