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

  rotateLeft(pivotParent: RBTNode<T>): void {
    if (pivotParent === this.nil || pivotParent.right === this.nil) {
      return;
    }

    const pivot = pivotParent.right!;
    pivotParent.right = pivot.left;

    if (pivot.left !== this.nil) {
      pivot.left!.parent = pivotParent;
    }

    pivot.parent = pivotParent.parent;

    if (pivotParent.parent === this.nil) {
      this.root = pivot;
    } else if (pivotParent === pivotParent.parent!.left) {
      pivotParent.parent!.left = pivot;
    } else {
      pivotParent.parent!.right = pivot;
    }

    pivot.left = pivotParent;
    pivotParent.parent = pivot;
  }

  rotateRight(): void {
    //
  }

  insert(value: T): void {
    const newNode = new RBTNode<T>(value);
    newNode.parent = this.nil;
    newNode.left = this.nil;
    newNode.right = this.nil;
    newNode.isRed = true;

    let parentNode = this.nil;
    let currentNode = this.root;

    while (currentNode !== this.nil) {
      parentNode = currentNode;

      if (value < currentNode.value!) {
        currentNode = currentNode.left!;
      } else if (value > currentNode.value!) {
        currentNode = currentNode.right!;
      } else {
        // Disallow duplicate values.
        return;
      }
    }

    newNode.parent = parentNode;

    if (parentNode === this.nil) {
      newNode.isRed = false; // temp
      this.root = newNode;
    } else if (value < parentNode.value!) {
      parentNode.left = newNode;
    } else {
      parentNode.right = newNode;
    }
  }
}
