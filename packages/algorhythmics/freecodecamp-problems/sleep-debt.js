function sleepDebt(hoursSlept, targetHours) {
  let debt = 0;

  for (const hours of hoursSlept) {
    debt += targetHours - hours;
  }

  debt += targetHours;

  return debt < 0 ? 0 : debt;
}
