function largestNumber(str) {
  const seps = new Set([',', '!', '?', ':', ';']);
  const nums = [];

  let i = 0;
  for (let j = 0; j < str.length; j++) {
    if (seps.has(str[j])) {
      const num = Number(str.slice(i, j));
      nums.push(num);
      i = j + 1;
    }
  }

  nums.push(Number(str.slice(i)));
  return Math.max(...nums);
}
