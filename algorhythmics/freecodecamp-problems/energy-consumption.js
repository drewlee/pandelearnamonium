function compareEnergy(caloriesBurned, wattHoursUsed) {
  const caloriesJoules = caloriesBurned * 4184;
  const wattsJoules = wattHoursUsed * 3600;

  if (caloriesJoules > wattsJoules) {
    return 'Workout';
  } else if (caloriesJoules < wattsJoules) {
    return 'Devices';
  }

  return 'Equal';
}
