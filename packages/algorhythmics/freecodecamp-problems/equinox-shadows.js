function getShadow(time) {
  const [hr, mn] = time.split(':').map((value) => Number(value));

  if (hr < 6 || hr >= 18 || (hr === 12 && mn === 0)) {
    return 'No shadow';
  }

  const dir = hr < 12 ? 'west' : 'east';
  const timeNum = hr + mn / 60;
  const diff = Math.abs(12 - timeNum);
  const length = diff ** 3;

  return `${length}ft ${dir}`;
}
