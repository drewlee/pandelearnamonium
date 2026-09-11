function getSpokenTime(hourAngle, minuteAngle) {
  const hour = hourAngle === 0 ? 12 : Math.floor(hourAngle / 30);
  const minutes = Math.floor(minuteAngle / 6);
  let result;

  if (minutes === 0) {
    result = `${hour} o'clock`;
  } else if (minutes === 15) {
    result = `quarter past ${hour}`;
  } else if (minutes === 30) {
    result = `half past ${hour}`;
  } else if (minutes === 45) {
    result = `quarter to ${hour + 1}`;
  } else if (minutes < 30) {
    result = `${minutes} minutes past ${hour}`;
  } else {
    result = `${60 - minutes} minutes to ${hour + 1}`;
  }

  return result;
}
