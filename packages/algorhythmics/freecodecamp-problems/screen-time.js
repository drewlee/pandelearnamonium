function tooMuchScreenTime(hours) {
  let totalSum = 0;
  let threeDaySum = 0;

  for (let i = 0; i < hours.length; i++) {
    if (hours[i] >= 10) {
      return true;
    }

    if (i < 3) {
      threeDaySum += hours[i];
    } else {
      if (threeDaySum / 3 >= 8) {
        return true;
      }

      threeDaySum -= hours[i - 3];
      threeDaySum += hours[i];
    }

    totalSum += hours[i];
  }

  if (threeDaySum / 3 >= 8) {
    return true;
  }

  if (totalSum / hours.length >= 6) {
    return true;
  }

  return false;
}
