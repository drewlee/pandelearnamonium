function isNarcissistic(n) {
  const digits = [];
  let nums = n;

  while (nums > 0) {
    const digit = nums % 10;
    digits.push(digit);
    nums = Math.floor(nums / 10);
  }

  const dLen = digits.length;
  const result = digits.reduce((sum, val) => {
    sum += Math.pow(val, dLen);
    return sum;
  }, 0);

  return n === result;
}
