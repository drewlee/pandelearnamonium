function zipStrings(a, b) {
  let merged = '';
  let i = 0;

  while (i < a.length && i < b.length) {
    merged += a[i];
    merged += b[i];
    i++;
  }

  if (i < a.length) {
    merged += a.slice(i);
  }

  if (i < b.length) {
    merged += b.slice(i);
  }

  return merged;
}
