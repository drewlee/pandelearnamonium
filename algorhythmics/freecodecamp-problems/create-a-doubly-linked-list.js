const Node = function (data, prev) {
  this.data = data;
  this.prev = prev;
  this.next = null;
};
const DoublyLinkedList = function () {
  this.head = null;
  this.tail = null;
  // Only change code below this line
  this.add = function (element) {
    const newNode = new Node(element);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  };

  this.remove = function (element) {
    let prevNode = null;
    let node = this.head;

    while (node !== null) {
      if (node.data === element) {
        if (prevNode !== null) {
          prevNode.next = node.next;
        } else {
          this.head = node.next;
        }

        if (node.next !== null) {
          node.next.prev = prevNode;
        } else {
          this.tail = prevNode;
        }

        return;
      }

      prevNode = node;
      node = node.next;
    }

    return null;
  };
  // Only change code above this line
};
