function goldilocksZone(mass) {
  const lumin = Math.pow(mass, 3.5);
  const sqrt = Math.sqrt(lumin);
  const start = Number((0.95 * sqrt).toFixed(2));
  const end = Number((1.37 * sqrt).toFixed(2));

  return [start, end];
}
