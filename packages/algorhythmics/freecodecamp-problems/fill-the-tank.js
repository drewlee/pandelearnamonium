function costToFill(tankSize, fuelLevel, pricePerGallon) {
  const fuelNeeded = tankSize - fuelLevel;
  const total = pricePerGallon * fuelNeeded;

  return `$${total.toFixed(2)}`;
}
