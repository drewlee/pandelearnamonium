function sortNumbers(str) {
  const nums = str.split(',').map((val) => Number(val));

  return nums.sort((a, b) => a - b);
}
