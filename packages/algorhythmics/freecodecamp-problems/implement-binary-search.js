function binarySearch(searchList, value) {
  let arrayPath = [];
  let left = 0;
  let right = searchList.length - 1;
  let mid;

  while (left <= right) {
    mid = left + Math.floor((right - left) / 2);
    arrayPath.push(searchList[mid]);

    if (searchList[mid] === value) {
      break;
    } else if (searchList[mid] > value) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (arrayPath[arrayPath.length - 1] !== value) {
    return 'Value Not Found';
  }

  return arrayPath;
}
