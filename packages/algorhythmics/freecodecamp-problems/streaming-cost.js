function getStreamingBill(cart, subscription) {
  const feesRef = {
    HD: {
      rent: 399,
      buy: 1299,
    },
    '4K': {
      rent: 599,
      buy: 1999,
    },
  };

  const discount = new Map([
    ['basic', 0.1],
    ['premium', 0.25],
  ]);

  let total = 0;

  for (const { format, type } of cart) {
    total += feesRef[format][type];
  }

  if (discount.has(subscription)) {
    total = total - total * discount.get(subscription);
  }

  return `$${(total * 0.01).toFixed(2)}`;
}
