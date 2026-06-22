function getDaytimeHours(latitude) {
  const daytimeHrs = 12 + (latitude / 90) * 12;
  const half = Math.round(daytimeHrs / 2);
  const sunrise = 12 - half;
  const sunset = 12 + half;
  let result = '';

  for (let i = 0; i < 24; i++) {
    if (i < sunrise || i >= sunset) {
      result += '🌑';
    } else {
      result += '☀️';
    }
  }

  return result;
}
