const displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.remove = function (element) {
  if (this.root === null) {
    return null;
  }

  function findNode(targetValue, node, parentNode) {
    if (node.value > targetValue && node.left !== null) {
      return findNode(targetValue, node.left, node);
    } else if (node.value < targetValue && node.right !== null) {
      return findNode(targetValue, node.right, node);
    } else if (node.value === targetValue) {
      return [node, parentNode];
    }

    return null;
  }

  const target = findNode(element, this.root);

  if (target === null) {
    return null;
  }

  const [targetNode, parentNode] = target;
  const children = [];

  for (const prop of ['left', 'right']) {
    if (targetNode[prop] !== null) {
      children.push(targetNode[prop]);
    }
  }

  if (children.length === 0) {
    if (targetNode === this.root) {
      this.root = null;
    } else {
      for (const prop of ['left', 'right']) {
        if (parentNode[prop] === targetNode) {
          parentNode[prop] = null;
        }
      }
    }
  } else if (children.length === 1) {
    if (targetNode === this.root) {
      this.root = children[0];
    } else {
      for (const prop of ['left', 'right']) {
        if (parentNode[prop] === targetNode) {
          parentNode[prop] = children[0];
        }
      }
    }
  }
};
