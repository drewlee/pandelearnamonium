function countChange(change) {
  let count = '$0.00';

  if (!change.length) {
    return count;
  }

  const sum = change.reduce((sum, amount) => sum + amount, 0);
  const fixedSum = (sum / 100).toFixed(2);
  count = `$${fixedSum}`;

  return count;
}
