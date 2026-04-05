function getRotation(n) {
  let numStr = String(n);
  let i = 0;
  const len = numStr.length;

  while (i < len) {
    if (Number(numStr) % len === 0) {
      return i;
    }

    numStr = numStr.slice(1) + numStr.slice(0, 1);
    i++;
  }

  return 'none';
}
