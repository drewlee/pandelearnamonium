function adjustThermostat(temp, target) {
  if (temp < target) {
    return 'heat';
  } else if (temp > target) {
    return 'cool';
  }

  return 'hold';
}
