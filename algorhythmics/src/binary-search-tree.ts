/**
 * A binary search tree is an efficient data structure for fast, O(log n), data storage and
 * retrieval. It is made up of a root node and at most two child branches, named `left` and `right`.
 */
export default class BinarySearchTree<T> {
  value: T;
  left: BinarySearchTree<T> | null;
  right: BinarySearchTree<T> | null;

  /**
   * Class constructor.
   *
   * @param value - The value to set for the node.
   */
  constructor(value: T) {
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
    if (value < this.value) {
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
   * Removes the node from the tree with the specified value and returns it.
   *
   * @param value - The target value.
   * @returns The removed node, or `null` if it isn't found.
   */
  delete(value: T, parent: BinarySearchTree<T> | null = null): BinarySearchTree<T> | null {
    if (this.value === value) {
      let child: BinarySearchTree<T> | null = null;

      // If the current node has no children, `null` will take its place.
      // If the current node has one child, the child will take its place.
      // If the current node has two children:
      // - Find the node with the smallest value in the right subtree.
      // - The min-value node takes the current node's place.
      // - The min-value node is deleted from it's original place.
      if (this.left === null) {
        child = this.right;
      } else if (this.right === null) {
        child = this.left;
      } else {
        child = this.right;

        while (child.left !== null) {
          child = child.left;
        }

        const temp = child.right;
        this.right.delete(child.value);

        child.left = this.left;
        child.right = temp;
      }

      // Determine which pointer the current node branches off of the parent,
      // then reassign it to the appropriate child node.
      if (parent !== null) {
        const branch = parent.left === this ? 'left' : 'right';
        parent[branch] = child;
      } else {
        // This is a root node.
        // if (child !== null) {
        //   this.value = child?.value;
        // }
        // console.log('exec');
      }

      // Null out the pointers for the return value.
      this.left = null;
      this.right = null;

      return this;
    } else if (this.left !== null && value < this.value) {
      return this.left.delete(value, this);
    } else if (this.right !== null && value >= this.value) {
      return this.right.delete(value, this);
    }

    return null;
  }

  /**
   * Returns the minimum value in the binary search tree.
   *
   * @returns Minimum value in the tree.
   */
  getMin(): T {
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
  getMax(): T {
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
