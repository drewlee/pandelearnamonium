function selectionSort(array) {
  // Only change code below this line
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    [array[i], array[minIdx]] = [array[minIdx], array[i]];
  }

  return array;
  // Only change code above this line
}
