function piggyBank(coins) {
  const coinValues = new Map([
    ['pennies', 1],
    ['nickels', 5],
    ['dimes', 10],
    ['quarters', 25],
  ]);

  const coinEntries = Object.entries(coins);
  let total = 0;

  for (const [coin, qty] of coinEntries) {
    total += coinValues.get(coin) * qty;
  }

  const fixedTotal = (total / 100).toFixed(2);
  return `$${fixedTotal}`;
}
