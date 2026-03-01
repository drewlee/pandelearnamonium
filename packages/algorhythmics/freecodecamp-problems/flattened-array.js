function isFlat(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      return false;
    }
  }

  return true;
}
