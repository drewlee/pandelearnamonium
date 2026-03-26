function getMovieNightCost(day, showtime, numberOfTickets) {
  const amOrPm = showtime.slice(-2);
  const [hr] = showtime.slice(0, -2).split(':');
  const nHr = amOrPm === 'am' ? Number(hr) : 12 + Number(hr);
  let cost = 0;

  switch (day) {
    case 'Monday':
      cost = 10;
      break;
    case 'Tuesday':
      cost = 5;
      break;
    case 'Wednesday':
    case 'Thursday':
      cost = 10;
      break;
    case 'Friday':
    case 'Saturday':
    case 'Sunday':
      cost = 12;
      break;
  }

  if (nHr < 17 && day !== 'Tuesday') {
    cost -= 2;
  }

  cost *= numberOfTickets;
  return `$${cost}.00`;
}
