const BASE_CODE = '0'.charCodeAt(0);
const DIGIT_LEN = 10;

function isDigit(char) {
  const code = char.charCodeAt(0);
  return code >= BASE_CODE && code < BASE_CODE + DIGIT_LEN;
}

function doMath(str) {
  const nums = [];
  const ops = [];

  let left = 0;
  let isDigitScan = false;

  for (let right = 0; right < str.length; right++) {
    if (isDigit(str[right]) && !isDigitScan) {
      // Ignore chars from the beginning of the string
      if (left !== 0 && left !== right) {
        ops.push(right - left);
      }

      left = right;
      isDigitScan = true;
    } else if (!isDigit(str[right]) && isDigitScan) {
      nums.push(Number(str.slice(left, right)));
      left = right;
      isDigitScan = false;
    }
  }

  // Push the number from the end of the string
  if (isDigitScan) {
    nums.push(Number(str.slice(left)));
  }

  let result = nums[0];
  let j = 0;

  for (let i = 1; i < nums.length; i++) {
    if (ops[j] % 2 === 0) {
      // Addition for even numbers
      result += nums[i];
    } else {
      // Subtraction for odd numbers
      result -= nums[i];
    }

    j++;
  }

  return result;
}
