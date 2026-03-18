function burnCandles(candles, leftoversNeeded) {
  let currCandles = candles;
  let leftovers = 0;
  let total = 0;

  while (currCandles > 0) {
    const tmp = currCandles + leftovers;

    total += currCandles;
    currCandles = Math.floor(tmp / leftoversNeeded);
    leftovers = tmp % leftoversNeeded;
  }

  return total;
}
