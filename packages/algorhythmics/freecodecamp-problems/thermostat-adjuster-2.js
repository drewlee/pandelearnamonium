function adjustThermostat(currentF, targetC) {
  const targetF = targetC * 1.8 + 32;
  const diff = Math.abs(currentF - targetF).toFixed(1);

  if (targetF > currentF) {
    return `Heat: ${diff} degrees Fahrenheit`;
  } else if (targetF < currentF) {
    return `Cool: ${diff} degrees Fahrenheit`;
  }
  return 'Hold';
}
