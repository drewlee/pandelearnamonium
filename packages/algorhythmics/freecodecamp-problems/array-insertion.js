function insertIntoArray(arr, value, index) {
  const newArr = [];
  let offset = 0;

  for (let i = 0; i < arr.length + 1; i++) {
    if (i === index) {
      newArr[i] = value;
      offset--;
    } else {
      newArr[i] = arr[i + offset];
    }
  }

  return newArr;
}
