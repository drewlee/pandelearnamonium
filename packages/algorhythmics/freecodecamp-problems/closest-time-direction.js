function getDirection(time1, time2) {
  const day = 24 * 60;
  const [hr1, mn1] = time1.split(':').map((val) => Number(val));
  const [hr2, mn2] = time2.split(':').map((val) => Number(val));
  const mins1 = hr1 * 60 + mn1;
  const mins2 = hr2 * 60 + mn2;

  const [forward, backward] = [mins2 - mins1, mins1 - mins2].map((value) =>
    value < 0 ? day + value : value,
  );

  if (forward < backward) {
    return 'forward';
  } else if (forward > backward) {
    return 'backward';
  }

  return 'equal';
}
