function getSpokenDuration(seconds) {
  const totalMins = Math.floor(seconds / 60);
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  const secs = seconds % 60;
  let result = '';

  if (hrs) {
    result += `${hrs} ${hrs === 1 ? 'hour' : 'hours'}`;
  }

  if (mins) {
    if (result) {
      result += ', ';
    }
    result += `${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
  }

  if (secs) {
    if (result) {
      result += ' and ';
    }
    result += `${secs} ${secs === 1 ? 'second' : 'seconds'}`;
  }

  return result;
}
