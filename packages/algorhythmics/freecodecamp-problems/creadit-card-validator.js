function isValidCard(number) {
  const nLen = number.length;
  const numArr = number.split('');
  const doubled = new Array(nLen).fill(0);

  for (let i = nLen - 1; i >= 0; i--) {
    const j = nLen - i - 1;
    let num = Number(numArr[i]);

    // Skip every other number starting from right
    if (j % 2 !== 0) {
      num *= 2;

      // Subtract 9 if double is greater than 9
      if (num > 9) {
        num -= 9;
      }
    }

    doubled[i] = num;
  }

  const sum = doubled.reduce((sum, num) => {
    sum += num;
    return sum;
  }, 0);

  return sum % 10 === 0;
}
