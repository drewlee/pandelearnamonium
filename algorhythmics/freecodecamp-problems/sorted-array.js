function isSorted(arr) {
  let isAsc = false;
  let isDesc = false;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      isAsc = true;
    } else if (arr[i] < arr[i - 1]) {
      isDesc = true;
    }

    if (isAsc && isDesc) {
      return 'Not sorted';
    }
  }

  if (isAsc) {
    return 'Ascending';
  }

  return 'Descending';
}
