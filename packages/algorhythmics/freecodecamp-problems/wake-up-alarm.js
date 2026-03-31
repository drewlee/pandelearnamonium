function alarmCheck(alarmTime, wakeTime) {
  const [aHr, aMn] = alarmTime.split(':').map((val) => Number(val));
  const [wHr, wMn] = wakeTime.split(':').map((val) => Number(val));
  const a = aHr * 60 + aMn;
  const w = wHr * 60 + wMn;

  if (w < a) {
    return 'early';
  } else if (w - a <= 10) {
    return 'on time';
  }

  return 'late';
}
