function lastLoadDate(scoops, usage) {
  const sum = usage.reduce((val, sum) => val + sum, 0);
  const avg = sum / usage.length;

  return Math.floor(scoops / avg);
}
