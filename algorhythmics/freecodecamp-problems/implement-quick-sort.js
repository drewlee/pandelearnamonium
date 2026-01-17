function quickSort(array) {
  // Only change code below this line
  function qsort(start, end) {
    if (start >= end) {
      return;
    }

    const pivotIdx = start + Math.floor(Math.random() * (end - start));
    const pivotVal = array[pivotIdx];

    [array[pivotIdx], array[end - 1]] = [array[end - 1], array[pivotIdx]];

    let boundary = start;

    for (let i = start; i < end; i++) {
      if (array[i] < pivotVal) {
        [array[boundary], array[i]] = [array[i], array[boundary]];
        boundary++;
      }
    }

    [array[boundary], array[end - 1]] = [array[end - 1], array[boundary]];

    qsort(start, boundary);
    qsort(boundary + 1, end);
  }

  qsort(0, array.length);

  return array;
  // Only change code above this line
}
