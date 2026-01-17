function isLeapYear(year) {
  // - Divisible by 4
  // - Not divisible by 100,
  // - Unless evenly divisible by 400
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 > 0)) {
    return true;
  }

  return false;
}
