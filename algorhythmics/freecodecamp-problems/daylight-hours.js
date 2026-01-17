const latDayHours = new Map([
  [-90, 24],
  [-75, 23],
  [-60, 21],
  [-45, 15],
  [-30, 13],
  [-15, 12],
  [0, 12],
  [15, 11],
  [30, 10],
  [45, 9],
  [60, 6],
  [75, 2],
  [90, 0],
]);

function daylightHours(latitude) {
  if (latDayHours.has(latitude)) {
    return latDayHours.get(latitude);
  }

  for (const [lat, hours] of latDayHours) {
    if ((latitude > lat && latitude <= lat + 7) || (latitude < lat && latitude >= lat - 7)) {
      return hours;
    }
  }
}
