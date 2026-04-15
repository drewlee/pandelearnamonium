function calculateAge(birthday) {
  const baseDt = new Date('2025-11-27');
  const birthDt = new Date(birthday);
  const diff = baseDt - birthDt;

  return Math.floor(diff / 1000 / 60 / 60 / 24 / 365.25);
}
