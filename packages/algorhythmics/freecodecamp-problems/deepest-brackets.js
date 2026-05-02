function getDeepestBrackets(str) {
  const brackets = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
  ]);
  const stack = [];
  let maxDepth = 0;
  let startIdx = 0;
  let endIdx = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (brackets.has(char)) {
      stack.push(i);
    } else if (stack.length && brackets.get(str[stack[stack.length - 1]]) === char) {
      if (stack.length > maxDepth) {
        maxDepth = stack.length;
        startIdx = stack[stack.length - 1] + 1;
        endIdx = i;
      }

      stack.pop();
    }
  }

  return str.slice(startIdx, endIdx);
}
