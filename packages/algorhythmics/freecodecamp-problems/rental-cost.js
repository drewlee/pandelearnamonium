function getRentalCost(rented, returned, tier) {
  const cost = {
    1: { base: 499, fee: 399 },
    3: { base: 399, fee: 299 },
    7: { base: 299, fee: 99 },
  };

  const rentedDt = new Date(rented);
  rentedDt.setUTCHours(12);
  rentedDt.setUTCMinutes(0);

  const rentedTS = rentedDt.getTime();
  const dueTS = rentedTS + tier * 24 * 60 * 60 * 1000;

  const returnedDt = new Date(returned);
  const returnedTS = returnedDt.getTime();

  const { base, fee } = cost[tier];
  let total = base;

  if (returnedTS > dueTS) {
    const diff = returnedTS - dueTS;
    const daysOver = Math.ceil(diff / 24 / 60 / 60 / 1000);

    total += daysOver * fee;
  }

  return `$${(total * 0.01).toFixed(2)}`;
}
