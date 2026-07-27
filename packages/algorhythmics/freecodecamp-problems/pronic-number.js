function isPronic(n) {
  let i = 1;
  let product = -1;

  while (product < n) {
    product = i * (i - 1);

    if (product === n) {
      return true;
    }

    i++;
  }

  return false;
}
