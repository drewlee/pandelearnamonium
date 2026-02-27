import RBTNode from './nodes/rbt-node.js';

/**
 * Red-black trees (RBTs) are binary search trees with self-rebalancing capabilities, preventing
 * the degradation of BST search operations from O(log n) time complexity to O(n).
 */
export default class RedBlackTree<T extends bigint | number | string> {
  nil: RBTNode<T>;
  root: RBTNode<T>;

  constructor() {
    this.nil = new RBTNode<T>();
    this.root = this.nil;
  }

  /**
   * Rotates the specified parent's right node leftwards.
   *
   * @param pivotParent - Parent of the node to pivot.
   */
  rotateLeft(pivotParent: RBTNode<T>): void {
    // Bail if there's no parent or pivot node.
    if (pivotParent === this.nil || pivotParent.right === this.nil) {
      return;
    }

    /*
    In a rotation operation, there are three nodes that are modified:
    - The pivot node.
    - The pivot's parent node.
    - The pivot's left child.
    The pivot node takes the place of its parent. Update references:
    - pivot.parent
    - pivot.left
    Its parent becomes the pivot's left child. Update references:
    - parent.parent
    - parent.right
    The pivot's left child becomes the parent's right child. Update references:
    - pivot.left.parent
    As well as the left or right references of the pivot parent's parent.
    */

    // Get a reference to the pivot. Pivot is the parent's right node.
    const pivot = pivotParent.right!;

    // Reassigns the parent's right node to be the pivot's left node.
    pivotParent.right = pivot.left;

    // Reassigns the pivot left node's parent reference.
    if (pivot.left !== this.nil) {
      pivot.left!.parent = pivotParent;
    }

    // Reassign the pivot's parent reference.
    pivot.parent = pivotParent.parent;

    // Pivot takes place of the pivot's parent node.
    if (pivotParent.parent === this.nil) {
      this.root = pivot;
    } else if (pivotParent === pivotParent.parent!.left) {
      pivotParent.parent!.left = pivot;
    } else {
      pivotParent.parent!.right = pivot;
    }

    // The pivot's parent is reassigned as it's left child.
    pivot.left = pivotParent;
    pivotParent.parent = pivot;
  }

  /**
   * Rotates the specified parent's left node rightwards.
   *
   * @param pivotParent - Parent of the node to pivot.
   */
  rotateRight(pivotParent: RBTNode<T>): void {
    // Bail if there's no parent or pivot node.
    if (pivotParent === this.nil || pivotParent.left === this.nil) {
      return;
    }

    /*
    In a rotation operation, there are three nodes that are modified:
    - The pivot node.
    - The pivot's parent node.
    - The pivot's right child.
    The pivot node takes the place of its parent. Update references:
    - pivot.parent
    - pivot.right
    Its parent becomes the pivot's right child. Update references:
    - parent.parent
    - parent.left
    The pivot's right child becomes the parent's left child. Update references:
    - pivot.right.parent
    As well as the left or right references of the pivot parent's parent.
    */

    // Get a reference to the pivot. Pivot is the parent's left node.
    const pivot = pivotParent.left!;

    // Reassigns the parent's right node to be the pivot's left node.
    pivotParent.left = pivot.right;

    // Reassigns the pivot right node's parent reference.
    if (pivot.right !== this.nil) {
      pivot.right!.parent = pivotParent;
    }

    // Reassign the pivot's parent reference.
    pivot.parent = pivotParent.parent;

    // Pivot takes place of the pivot's parent node.
    if (pivotParent.parent === this.nil) {
      this.root = pivot;
    } else if (pivotParent === pivotParent.parent!.left) {
      pivotParent.parent!.left = pivot;
    } else {
      pivotParent.parent!.right = pivot;
    }

    // The pivot's parent is reassigned as it's right child.
    pivot.right = pivotParent;
    pivotParent.parent = pivot;
  }

  /**
   * Fixes an unbalanced tree structure after a new node insertion.
   *
   * @param newNode - Newly inserted node.
   */
  fixInsert(newNode: RBTNode<T>): void {
    let currentNode = newNode;

    while (currentNode !== this.root && currentNode.parent!.isRed) {
      let parent = currentNode.parent!;
      const grandParent = parent.parent!;

      if (parent === grandParent.right) {
        const uncle = grandParent.left!;

        if (uncle.isRed) {
          uncle.isRed = false;
          parent.isRed = false;
          grandParent.isRed = true;
          currentNode = grandParent;
        } else {
          if (currentNode === parent.left) {
            currentNode = parent;
            this.rotateRight(currentNode);
            parent = currentNode.parent!;
          }

          parent.isRed = false;
          grandParent.isRed = true;
          this.rotateLeft(grandParent);
        }
      }

      if (parent === grandParent.left) {
        const uncle = grandParent.right!;

        if (uncle.isRed) {
          uncle.isRed = false;
          parent.isRed = false;
          grandParent.isRed = true;
          currentNode = grandParent;
        } else {
          if (currentNode === parent.right) {
            currentNode = parent;
            this.rotateLeft(currentNode);
            parent = currentNode.parent!;
          }

          parent.isRed = false;
          grandParent.isRed = true;
          this.rotateRight(grandParent);
        }
      }
    }

    this.root.isRed = false;
  }

  /**
   * Inserts a new value into the red-black tree.
   *
   * @param value - Value to insert.
   */
  insert(value: T): void {
    const newNode = new RBTNode<T>(value);
    newNode.parent = this.nil;
    newNode.left = this.nil;
    newNode.right = this.nil;
    newNode.isRed = true;

    if (this.root === this.nil) {
      this.root = newNode;
    } else {
      let currentNode = this.root;

      while (currentNode !== this.nil) {
        if (value < currentNode.value!) {
          if (currentNode.left === this.nil) {
            newNode.parent = currentNode;
            currentNode.left = newNode;
            break;
          }

          currentNode = currentNode.left!;
        } else if (value > currentNode.value!) {
          if (currentNode.right === this.nil) {
            newNode.parent = currentNode;
            currentNode.right = newNode;
            break;
          }

          currentNode = currentNode.right!;
        } else {
          // Disallow duplicate values.
          return;
        }
      }
    }

    this.fixInsert(newNode);
  }
}
