function daysUntilWeekend(dateString) {
  const dt = new Date(dateString);
  const day = dt.getUTCDay();

  if (day === 0 || day === 6) {
    return "It's the weekend!";
  }

  const daysUntil = 6 - day;
  const dayNoun = daysUntil === 1 ? 'day' : 'days';

  return `${daysUntil} ${dayNoun} until the weekend.`;
}
