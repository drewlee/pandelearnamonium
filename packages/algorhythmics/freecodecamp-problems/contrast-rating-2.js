function getContrastRating(l1, l2, isLargeText) {
  l1 += 0.05;
  l2 += 0.05;

  const minAAA = isLargeText ? 4.5 : 7;
  const minAA = isLargeText ? 3 : 4.5;
  const ratio = l1 / l2;

  if (ratio < minAA) {
    return 'Fail';
  }

  if (ratio < minAAA) {
    return 'AA';
  }

  return 'AAA';
}
