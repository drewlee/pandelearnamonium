function to12(time) {
  let hr = Number(time.slice(0, 2));
  const mn = time.slice(2);
  const amOrPm = hr < 12 ? 'AM' : 'PM';

  if (hr === 0) {
    hr = 12;
  }

  if (hr > 12) {
    hr -= 12;
  }

  return `${hr}:${mn} ${amOrPm}`;
}
