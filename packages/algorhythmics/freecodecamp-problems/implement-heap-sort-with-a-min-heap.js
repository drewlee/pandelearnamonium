function isSorted(a) {
  for (let i = 0; i < a.length - 1; i++) if (a[i] > a[i + 1]) return false;
  return true;
}
// Generate a randomly filled array
function createRandomArray(size = 5) {
  let a = new Array(size);
  for (let i = 0; i < size; i++) a[i] = Math.floor(Math.random() * 100);

  return a;
}
const array = createRandomArray(25);

const MinHeap = function () {
  // Only change code below this line
  this.heap = [];

  this.swap = function (index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  };

  this.getParentIndex = function (index) {
    return Math.floor((index - 1) / 2);
  };

  this.heapify = function (index) {
    let currIdx = index;
    let parentIdx = this.getParentIndex(currIdx);

    while (currIdx > 0 && this.heap[currIdx] < this.heap[parentIdx]) {
      this.swap(currIdx, parentIdx);

      currIdx = parentIdx;
      parentIdx = this.getParentIndex(currIdx);
    }
  };

  this.insert = function (value) {
    this.heap.push(value);
    const index = this.heap.length - 1;

    this.heapify(index);
  };

  this.remove = function () {
    const lastEl = this.heap.pop();
    const len = this.heap.length;

    if (!len) {
      return lastEl;
    }

    const minValue = this.heap[0];
    this.heap[0] = lastEl;
    let currIdx = 0;

    while (currIdx < len) {
      const child1 = currIdx * 2 + 1;
      const child2 = child1 + 1;
      const children = [child1, child2].filter((index) => index < len);
      const minIdx = children.reduce((min, index) => {
        if (this.heap[index] < this.heap[min]) {
          min = index;
        }
        return min;
      }, currIdx);

      if (this.heap[minIdx] >= this.heap[currIdx]) {
        break;
      }

      this.swap(minIdx, currIdx);
      currIdx = minIdx;
    }

    return minValue;
  };

  this.sort = function () {
    const sorted = [];

    while (this.heap.length) {
      const value = this.remove();
      sorted.push(value);
    }

    return sorted;
  };
  // Only change code above this line
};
