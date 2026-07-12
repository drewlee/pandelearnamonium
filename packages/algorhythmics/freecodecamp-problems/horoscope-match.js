function horoscopeMatch(sign1, sign2) {
  const signs = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ];
  const compat = ['100%', '40%', '80%', '30%', '90%', '20%', '50%'];

  const index1 = signs.indexOf(sign1);
  const index2 = signs.indexOf(sign2);
  let distance = Math.abs(index2 - index1);

  if (distance > 6) {
    distance = 12 - distance;
  }

  return compat[distance];
}
