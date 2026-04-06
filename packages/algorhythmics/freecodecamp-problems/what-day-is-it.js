const DAY_REF = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getDayOfWeek(timestamp) {
  const dt = new Date(timestamp);
  const dayIdx = dt.getUTCDay();
  const day = DAY_REF[dayIdx];

  return day;
}
