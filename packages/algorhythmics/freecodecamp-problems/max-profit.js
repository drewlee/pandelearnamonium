function getMaxProfit(prices, budget) {
  let max = 0;
  let buy = -1;
  let sell = -1;

  let lo = 0;
  for (let hi = 1; hi < prices.length; hi++) {
    if (prices[lo] >= prices[hi]) {
      lo = hi;
    } else {
      const diff = prices[hi] - prices[lo];
      if (diff > max) {
        max = diff;
        buy = prices[lo];
        sell = prices[hi];
      }
    }
  }

  let maxProfit = 0;

  if (max > 0) {
    const shares = Math.floor(budget / buy);
    const buyPrice = shares * buy;
    const sellPrice = shares * sell;

    maxProfit = sellPrice - buyPrice;
  }

  return maxProfit.toFixed(2);
}
