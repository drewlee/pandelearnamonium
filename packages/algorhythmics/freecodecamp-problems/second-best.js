function getLaptopCost(laptops, budget) {
  const laptopsSet = new Set(laptops);
  const sorted = [...laptopsSet];

  // Sort from most expensive to least expensive
  sorted.sort((a, b) => b - a);

  // Second most expensive if within budget
  if (sorted[1] <= budget) {
    return sorted[1];
  }

  // Most expensive within budget
  const sliced = sorted.slice(2);
  for (const price of sliced) {
    if (price <= budget) {
      return price;
    }
  }

  return 0;
}
