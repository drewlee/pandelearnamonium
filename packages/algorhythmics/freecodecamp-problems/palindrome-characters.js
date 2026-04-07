function palindromeLocator(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return 'none';
    }

    left++;
    right--;
  }

  if (left === right) {
    return str[left];
  }

  return str[left] + str[right];
}
