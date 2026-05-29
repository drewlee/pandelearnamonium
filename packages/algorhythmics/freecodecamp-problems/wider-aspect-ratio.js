function greatestCommonDivisor(a, b) {
  // Stein's Algorithm
  // Both numbers are 0
  if (a === 0 && b === 0) {
    return 0;
  }

  // One number is 0
  if (a === 0 || b === 0) {
    return a || b;
  }

  // Numbers are equal
  if (a === b) {
    return a;
  }

  const isEvenA = a % 2 === 0;
  const isEvenB = b % 2 === 0;

  if (isEvenA && isEvenB) {
    // Both numbers are even
    return 2 * greatestCommonDivisor(a / 2, b / 2);
  } else if (!isEvenA && !isEvenB) {
    // Both numbers are odd
    const minNum = Math.min(a, b);

    return greatestCommonDivisor(Math.max(a, b) - minNum, minNum);
  }

  // One odd, one even
  if (isEvenA) {
    // a is even
    return greatestCommonDivisor(a / 2, b);
  }

  // b is even
  return greatestCommonDivisor(a, b / 2);
}

function getWiderAspectRatio(a, b) {
  const [aNums, bNums] = [a, b].map((numsStr) => numsStr.split('x').map((num) => Number(num)));

  let maxRatio = bNums;
  if (aNums[0] / aNums[1] > bNums[0] / bNums[1]) {
    maxRatio = aNums;
  }

  const gcd = greatestCommonDivisor(maxRatio[0], maxRatio[1]);
  const [w, h] = maxRatio.map((val) => val / gcd);

  return `${w}:${h}`;
}
