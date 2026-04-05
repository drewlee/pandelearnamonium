function sockPairs(pairs, cycles) {
  let socks = pairs * 2;

  for (let i = 1; i <= cycles; i++) {
    if (i % 2 === 0) {
      socks--;
    }

    if (i % 3 === 0) {
      socks++;
    }

    if (i % 5 === 0) {
      socks--;
    }

    if (i % 10 === 0) {
      socks += 2;
    }
  }

  const result = Math.floor(socks / 2);
  return result < 0 ? 0 : result;
}
