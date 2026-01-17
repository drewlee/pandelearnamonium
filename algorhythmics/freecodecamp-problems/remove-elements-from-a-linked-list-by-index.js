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

  // Only change code below this line
  this.removeAt = function (index) {
    let prevNode = null;
    let node = head;
    let currIndex = 0;

    while (node !== null) {
      if (currIndex === index) {
        if (node === head) {
          head = node.next;
        } else {
          prevNode.next = node.next;
        }

        length--;

        return node.element;
      }

      prevNode = node;
      node = node.next;
      currIndex++;
    }

    return null;
  };
  // Only change code above this line
}
