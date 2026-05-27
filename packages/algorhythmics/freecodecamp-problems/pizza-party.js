function getPizzasToOrder(hoursWorked) {
  let totalSlices = 0;

  for (const hours of hoursWorked) {
    let slices = Math.ceil(hours / 3);

    slices = slices < 2 ? 2 : slices;
    totalSlices += slices;
  }

  return Math.ceil(totalSlices / 8);
}
