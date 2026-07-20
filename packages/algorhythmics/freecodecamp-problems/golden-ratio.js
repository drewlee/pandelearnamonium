function isGoldenRatio(a, b) {
  const maxNum = Math.max(a, b);
  const minNum = Math.min(a, b);
  const ratio = maxNum / minNum;

  return ratio >= 1.608 && ratio <= 1.628;
}
