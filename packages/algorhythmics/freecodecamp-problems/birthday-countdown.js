function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysUntilBirthday(today, birthday) {
  const todayDt = new Date(today);
  todayDt.setUTCHours(0);
  todayDt.setUTCMinutes(0);
  todayDt.setUTCSeconds(0);
  todayDt.setUTCMilliseconds(0);

  const [birthMon, birthDay] = birthday.split('/').map((value) => Number(value));
  const nextBirthDt = new Date();
  const todayMon = todayDt.getUTCMonth() + 1;

  // Is the birthday yet to occur this year?
  const inc =
    todayMon > birthMon || (todayMon === birthMon && todayDt.getUTCDate() <= birthDay) ? 1 : 0;
  let nextBirthYr = todayDt.getUTCFullYear() + inc;

  // Handle leap years
  if (birthMon === 2 && birthDay === 29) {
    while (!isLeapYear(nextBirthYr)) {
      nextBirthYr++;
    }
  }

  nextBirthDt.setUTCFullYear(nextBirthYr);
  nextBirthDt.setUTCMonth(birthMon - 1);
  nextBirthDt.setUTCDate(birthDay);
  nextBirthDt.setUTCHours(0);
  nextBirthDt.setUTCMinutes(0);
  nextBirthDt.setUTCSeconds(0);
  nextBirthDt.setUTCMilliseconds(0);

  const diff = nextBirthDt.valueOf() - todayDt.valueOf();

  return Math.floor(diff / 1000 / 60 / 60 / 24);
}
