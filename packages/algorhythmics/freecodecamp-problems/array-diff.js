function arrayDiff(arr1, arr2) {
  const diff = new Set(arr1);

  for (const value of arr2) {
    if (diff.has(value)) {
      diff.delete(value);
    } else {
      diff.add(value);
    }
  }

  return [...diff].sort();
}
