function getContrastRating(ratio, isLargeText) {
  const minAAA = isLargeText ? 4.5 : 7;
  const minAA = isLargeText ? 3 : 4.5;
  const nRatio = Number(ratio);

  if (nRatio < minAA) {
    return 'Fail';
  }

  if (nRatio < minAAA) {
    return 'AA';
  }

  return 'AAA';
}
