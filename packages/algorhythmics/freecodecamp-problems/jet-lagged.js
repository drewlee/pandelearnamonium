function getJetLagHours(departureCity, arrivalCity, flightDuration, direction) {
  const city = new Map([
    ['Los Angeles', -8],
    ['New York', -5],
    ['London', 0],
    ['Istanbul', 3],
    ['Dubai', 4],
    ['Hong Kong', 8],
    ['Tokyo', 9],
  ]);
  const depOffset = city.get(departureCity);
  const arrOffset = city.get(arrivalCity);
  const tzDiff = Math.abs(depOffset - arrOffset);
  const multiplier = direction === 'east' ? 1.5 : 1.0;
  const lagHours = tzDiff + flightDuration * 0.1 * multiplier;

  return lagHours.toFixed(1);
}
