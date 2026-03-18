function runOp(num1, num2, op) {
  if (op === '+') {
    return num1 + num2;
  } else if (op === '-') {
    return num1 - num2;
  } else if (op === '*') {
    return num1 * num2;
  } else if (op === '/') {
    return num1 / num2;
  } else if (op === '%') {
    return num1 % num2;
  }
}

function evaluate(numbers, operators) {
  let result = numbers[0];
  let j = 0;

  for (let i = 1; i < numbers.length; i++) {
    result = runOp(result, numbers[i], operators[j]);
    j = (j + 1) % operators.length;
  }

  return result;
}
