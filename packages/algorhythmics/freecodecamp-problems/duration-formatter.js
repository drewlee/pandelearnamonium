function format(seconds) {
  const oneMin = 60;
  const oneHour = 60 * oneMin; // 3600
  let hrs = 0;

  if (seconds >= oneHour) {
    hrs = Math.floor(seconds / oneHour);
    seconds = seconds % oneHour;
  }

  const mns = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const sMns = mns < 10 && hrs > 0 ? `0${mns}` : String(mns);
  const sSec = sec < 10 ? `0${sec}` : String(sec);

  let result = `${sMns}:${sSec}`;

  if (hrs > 0) {
    result = `${hrs}:` + result;
  }

  return result;
}
