const menu = new Map([
  ['cold brew', 450],
  ['oat latte', 500],
  ['cappuccino', 475],
  ['espresso', 300],
  ['vanilla syrup', 75],
  ['caramel drizzle', 60],
  ['extra shot', 50],
  ['oat milk', 75],
  ['cream', 75],
]);

function formatCoffeeOrder(order) {
  const items = [];
  let total = 0;

  for (const [item, price] of menu) {
    if (order.includes(item)) {
      items.push(item);
      total += price;
    }
  }

  return items.join(' + ') + `: $${(total / 100).toFixed(2)}`;
}
