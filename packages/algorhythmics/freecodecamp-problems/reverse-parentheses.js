function reverseSubArr(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

function decode(s) {
  const result = s.split('');
  const stack = [];

  for (let i = 0; i < result.length; i++) {
    const char = result[i];

    if (char === '(') {
      stack.push(i);
    } else if (char === ')') {
      const start = stack.pop();
      reverseSubArr(result, start + 1, i - 1);
    }
  }

  return result.join('').replace(/\(|\)/g, '');
}
