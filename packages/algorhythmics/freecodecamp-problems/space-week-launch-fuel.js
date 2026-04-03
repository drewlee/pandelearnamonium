function launchFuel(payload) {
  const fuelRatio = 5;
  let total = 0;
  let fuelNeeded = payload;

  while (fuelNeeded >= 1) {
    fuelNeeded = fuelNeeded / fuelRatio;
    total += fuelNeeded;
  }

  return Number(total.toFixed(1));
}
