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
    // Only change code below this line
    const dummy = new Node(null);
    dummy.next = head;

    let currNode = dummy;

    while (currNode.next !== null) {
      if (currNode.next.element === element) {
        if (currNode.next === head) {
          head = currNode.next.next;
        }

        currNode.next = currNode.next.next;

        length--;
        break;
      }

      currNode = currNode.next;
    }
    // Only change code above this line
  };
}
