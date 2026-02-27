const zodiac = new Map([
  ['4-19', 'Ares'],
  ['5-20', 'Taurus'],
  ['6-20', 'Gemini'],
  ['7-22', 'Cancer'],
  ['8-22', 'Leo'],
  ['9-22', 'Virgo'],
  ['10-22', 'Libra'],
  ['11-21', 'Scorpio'],
  ['12-21', 'Sagittarius'],
  ['1-19', 'Capricorn'],
  ['2-18', 'Aquarius'],
  ['3-20', 'Pisces'],
]);

function getSign(dateStr) {
  const parts = dateStr.split('-');
  let month = Number(parts[1]);
  let day = Number(parts[2]);
  let key = `${month}-${day}`;

  // Increment day & month until an existing key is found
  while (!zodiac.has(key)) {
    if (day === 31) {
      day = 1;
      month = month === 12 ? 1 : month + 1;
    } else {
      day++;
    }
    key = `${month}-${day}`;
  }

  return zodiac.get(key);
}
