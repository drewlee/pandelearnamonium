function letterDistance(str1, str2) {
  const ALPHA_LEN = 26;
  const ALPHA_HALF = ALPHA_LEN / 2;
  const BASE_CODE = 'a'.charCodeAt(0);
  const len = str1.length;
  let sum = 0;

  for (let i = 0; i < len; i++) {
    const idx1 = str1[i].charCodeAt(0) - BASE_CODE;
    const idx2 = str2[i].charCodeAt(0) - BASE_CODE;
    const minVal = Math.min(idx1, idx2);
    const maxVal = Math.max(idx1, idx2);

    let diff = maxVal - minVal;
    if (diff >= ALPHA_HALF) {
      diff = ALPHA_LEN - diff;
    }

    sum += diff;
  }

  return sum;
}
