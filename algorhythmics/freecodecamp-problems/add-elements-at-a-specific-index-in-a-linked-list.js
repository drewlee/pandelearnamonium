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
  this.addAt = function (index, element) {
    const newNode = new Node(element);
    let node = head;
    let prevNode = null;
    let currentIndex = 0;

    while (node !== null) {
      if (currentIndex === index) {
        newNode.next = node;

        if (prevNode !== null) {
          prevNode.next = newNode;
        } else {
          head = newNode;
        }

        length++;

        return;
      }

      prevNode = node;
      node = node.next;
      currentIndex++;
    }

    return false;
  };
  // Only change code above this line
}
