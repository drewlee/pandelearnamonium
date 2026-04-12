const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getWeekday(dateString) {
  const dt = new Date(dateString);
  const dayIdx = dt.getUTCDay();

  return days[dayIdx];
}
