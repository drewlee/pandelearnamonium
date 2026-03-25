function canRetake(finishTime, currentTime) {
  const finishDt = new Date(finishTime);
  const currentDt = new Date(currentTime);
  const diff = currentDt - finishDt;

  if (diff >= 1000 * 60 * 60 * 24 * 2) {
    return true;
  }

  return false;
}
