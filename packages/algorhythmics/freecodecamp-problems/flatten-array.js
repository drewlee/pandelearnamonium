function flatten(arr) {
  function recFlatten(arr, result) {
    for (const item of arr) {
      if (Array.isArray(item)) {
        recFlatten(item, result);
      } else {
        result.push(item);
      }
    }

    return result;
  }

  return recFlatten(arr, []);
}
