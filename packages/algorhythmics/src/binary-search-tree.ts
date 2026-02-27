/**
 * A binary search tree is an efficient data structure for fast, O(log n), data storage and
 * retrieval. It is made up of a root node and at most two child branches, named `left` and `right`.
 */
export default class BinarySearchTree<T extends number | string | bigint> {
  value: T | null;
  left: BinarySearchTree<T> | null;
  right: BinarySearchTree<T> | null;

  /**
   * Class constructor.
   *
   * @param value - The value to set for the node.
   */
  constructor(value: T | null = null) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  /**
   * Inserts a new node into the tree with the specified value.
   *
   * @param value - The value to set for the node.
   */
  insert(value: T): void {
    // Values less than the current value must be placed left.
    // Values greater than or equal to the current value must be placed right.
    if (this.value === null) {
      this.value = value;
    } else if (value < this.value) {
      if (this.left === null) {
        this.left = new BinarySearchTree(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(value);
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
  getNodeByValue(value: T): BinarySearchTree<T> | null {
    // A tree with a null node is a no-op.
    if (this.value === null) {
      return null;
    }

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
   * Removes the node from the tree with the specified value.
   *
   * @param value - The target value.
   * @param isRoot - Whether this function is visiting the root node.
   * @returns The tree root or `null`.
   */
  delete(value: T, isRoot = true): BinarySearchTree<T> | null {
    // A tree with a `null` node is a no-op.
    if (this.value === null) {
      return this;
    }

    if (this.value === value) {
      // If the current node has no children, `null` will take its place.
      // If the current node has one child, the child will take its place.
      // If the current node has two children:
      // - Find the node with the minimum value in the right subtree.
      // - The min-value node takes the current node's place.
      // - The min-value node is deleted from it's original place.
      if (this.left === null) {
        if (isRoot) {
          this.value = this.right?.value ?? null;
          this.left = this.right?.left ?? null;
          this.right = this.right?.right ?? null;

          return this;
        }

        return this.right;
      } else if (this.right === null) {
        if (isRoot) {
          this.value = this.left?.value ?? null;
          this.right = this.left?.right ?? null;
          this.left = this.left?.left ?? null;

          return this;
        }

        return this.left;
      } else {
        let minNode = this.right;

        while (minNode.left !== null) {
          minNode = minNode.left;
        }

        this.value = minNode.value;
        this.right = this.right.delete(minNode.value!, false);
      }

      return this;
    } else if (this.left !== null && value < this.value) {
      this.left = this.left.delete(value, false);
    } else if (this.right !== null && value >= this.value) {
      this.right = this.right.delete(value, false);
    }

    return this;
  }

  /**
   * Returns the minimum value in the binary search tree.
   *
   * @returns Minimum value in the tree.
   */
  getMin(): T | null {
    if (this.left !== null) {
      return this.left.getMin();
    }
    return this.value;
  }

  /**
   * Returns the maximum value in the binary search tree.
   *
   * @returns Maximum value in the tree.
   */
  getMax(): T | null {
    if (this.right !== null) {
      return this.right.getMax();
    }
    return this.value;
  }

  /**
   * Uses in-order depth first traversal to log each node's value and depth level.
   */
  depthFirstTraversal(depth = 1): void {
    if (this.left !== null) {
      this.left.depthFirstTraversal(depth + 1);
    }

    console.log(`Value = ${String(this.value)}, depth = ${depth}`);

    if (this.right !== null) {
      this.right.depthFirstTraversal(depth + 1);
    }
  }
}
