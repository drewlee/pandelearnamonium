function calculateTips(mealPrice, customTip) {
  const price = Number(mealPrice.slice(1));
  const percent = Number(customTip.slice(0, -1)) / 100;
  const result = [0.15, 0.2, percent].map((val) => '$' + (price * val).toFixed(2));

  return result;
}
