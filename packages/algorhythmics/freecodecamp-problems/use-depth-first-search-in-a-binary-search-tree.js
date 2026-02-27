const displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function BinarySearchTree() {
  this.root = null;
  // Only change code below this line
  this.inorder = function (node = this.root, values = []) {
    if (node === null) {
      return null;
    }

    this.inorder(node.left, values);
    values.push(node.value);
    this.inorder(node.right, values);

    return values;
  };

  this.preorder = function (node = this.root, values = []) {
    if (node === null) {
      return null;
    }

    values.push(node.value);
    this.preorder(node.left, values);
    this.preorder(node.right, values);

    return values;
  };

  this.postorder = function (node = this.root, values = []) {
    if (node === null) {
      return null;
    }

    this.postorder(node.left, values);
    this.postorder(node.right, values);
    values.push(node.value);

    return values;
  };
  // Only change code above this line
}
