function milePace(miles, duration) {
  const dParts = duration.split(':');
  const dMins = Number(dParts[0]) * 60;
  const dSecs = Number(dParts[1]);

  const pace = (dMins + dSecs) / miles;
  const pMins = Math.floor(pace / 60);
  const pSecs = Math.floor(pace) % 60;

  const pMinsStr = pMins < 9 ? `0${pMins}` : String(pMins);

  const pSecsStr = pSecs < 9 ? `0${pSecs}` : String(pSecs);

  return `${pMinsStr}:${pSecsStr}`;
}
