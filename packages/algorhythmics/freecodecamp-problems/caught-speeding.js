function speeding(speeds, limit) {
  let count = 0;
  let sum = 0;

  for (const speed of speeds) {
    if (speed > limit) {
      count++;
      sum += speed - limit;
    }
  }

  if (!count) {
    return [0, 0];
  }

  return [count, sum / count];
}
