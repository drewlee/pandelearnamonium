function calculateBmi(weight, height) {
  return ((weight / Math.pow(height, 2)) * 703).toFixed(1);
}
