function oddOrEvenDay(timestamp) {
  const dateObj = new Date(timestamp);
  const date = dateObj.getUTCDate();
  const result = date % 2 === 0 ? 'even' : 'odd';

  return result;
}
