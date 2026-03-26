function formatNumber(number) {
  const countryCode = number[0];
  const areaCode = number.slice(1, 4);
  const localThree = number.slice(4, 7);
  const localFour = number.slice(7);

  return `+${countryCode} (${areaCode}) ${localThree}-${localFour}`;
}
