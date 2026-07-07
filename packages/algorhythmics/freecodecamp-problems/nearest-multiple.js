function roundToNearestMultiple(num, multiple) {
  let prevProduct = 0;
  let currProduct = multiple;

  while (currProduct <= num) {
    prevProduct = currProduct;
    currProduct += multiple;
  }

  if (currProduct - num < num - prevProduct) {
    return currProduct;
  }

  return prevProduct;
}
