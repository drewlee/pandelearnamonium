function smallestGap(str) {
  const charMap = new Map();
  let minGap = null;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (!charMap.has(char)) {
      charMap.set(char, i);
    } else {
      const start = charMap.get(char);
      const currGap = str.slice(start + 1, i);

      if (minGap === null || minGap.length > currGap.length) {
        minGap = currGap;
      }

      charMap.set(char, i);
    }
  }

  return minGap;
}
