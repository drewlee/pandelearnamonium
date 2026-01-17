function LinkedList() {
  let length = 0;
  let head = null;

  const Node = function (element) {
    this.element = element;
    this.next = null;
  };

  this.size = function () {
    return length;
  };

  this.head = function () {
    return head;
  };

  this.add = function (element) {
    const node = new Node(element);
    if (head === null) {
      head = node;
    } else {
      let currentNode = head;

      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = node;
    }

    length++;
  };

  this.remove = function (element) {
    let currentNode = head;
    let previousNode;
    if (currentNode.element === element) {
      head = currentNode.next;
    } else {
      while (currentNode.element !== element) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      previousNode.next = currentNode.next;
    }

    length--;
  };

  // Only change code below this line
  this.isEmpty = function () {
    return length === 0;
  };

  this.indexOf = function (element) {
    let index = 0;
    let node = head;

    while (node !== null) {
      if (node.element === element) {
        return index;
      }

      node = node.next;
      index++;
    }

    return -1;
  };

  this.elementAt = function (searchIndex) {
    let index = 0;
    let node = head;

    while (node !== null) {
      if (index === searchIndex) {
        return node.element;
      }

      node = node.next;
      index++;
    }
  };
  // Only change code above this line
}
