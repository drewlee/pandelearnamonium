function exactChange(amount) {
  const coins = [1, 5, 10, 25];
  const coinLen = coins.length;

  // Top-down/recursive solution
  /*
  function handleChange(amount, index, memo) {
    if (amount === 0) {
      return 1;
    }

    if (amount < 0 || index < 0) {
      return 0;
    }

    const key = `${amount},${index}`;

    if (memo.has(key)) {
      return memo.get(key);
    }

    const takeCount = handleChange(amount - coins[index], index, memo);
    const skipCount = handleChange(amount, index - 1, memo);
    const total = takeCount + skipCount;

    memo.set(key, total);

    return total;
  }

  return handleChange(amount, coinLen - 1, new Map());
  */

  // Bottom-up/tabulation solution
  const table = new Array(coinLen + 1).fill(null).map(() => new Array(amount + 1).fill(0));

  // Pre-fill the first column
  for (let i = 1; i <= coinLen; i++) {
    table[i][0] = 1;
  }

  for (let i = 1; i <= coinLen; i++) {
    for (let j = 1; j <= amount; j++) {
      const takeIdx = j - coins[i - 1];
      const takeCount = takeIdx >= 0 ? table[i][takeIdx] : 0;

      table[i][j] = takeCount + table[i - 1][j];
    }
  }

  return table[coinLen][amount];
}
