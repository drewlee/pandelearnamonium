function mixPaint(bucket1, bucket2) {
  const totalWeight = [bucket1, bucket2].reduce((sum, { fullness }) => sum + fullness, 0);

  const weighted = [bucket1, bucket2].map(({ color, fullness }) =>
    color.map((value) => value * fullness),
  );

  const sums = weighted.reduce(
    (mix, colors) => colors.map((value, i) => value + mix[i]),
    [0, 0, 0],
  );

  return sums.map((value) => Math.round(value / totalWeight));
}
