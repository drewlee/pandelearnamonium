const displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function BinarySearchTree() {
  this.root = null;
  // Only change code below this line
  this.levelOrder = function () {
    if (this.root === null) {
      return null;
    }

    const queue = [this.root];
    const values = [];

    while (queue.length) {
      let node = queue.shift();
      values.push(node.value);

      for (const child of [node.left, node.right]) {
        if (child !== null) {
          queue.push(child);
        }
      }
    }

    return values;
  };

  this.reverseLevelOrder = function () {
    if (this.root === null) {
      return null;
    }

    const queue = [this.root];
    const values = [];

    while (queue.length) {
      let node = queue.shift();
      values.push(node.value);

      for (const child of [node.right, node.left]) {
        if (child !== null) {
          queue.push(child);
        }
      }
    }

    return values;
  };
  // Only change code above this line
}
