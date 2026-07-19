function elevatorStops(currentFloor, stops) {
  const downFloors = [];
  const upFloors = [];

  for (const stop of stops) {
    if (stop < currentFloor) {
      downFloors.push(stop);
    } else {
      upFloors.push(stop);
    }
  }

  downFloors.sort((a, b) => b - a);
  upFloors.sort((a, b) => a - b);

  if (!downFloors.length) {
    return upFloors;
  }

  if (!upFloors.length) {
    return downFloors;
  }

  const downFloorCount = currentFloor - downFloors[downFloors.length - 1] + 1;
  const upFloorCount = upFloors[upFloors.length - 1] - currentFloor + 1;

  if (downFloorCount >= upFloorCount) {
    return upFloors.concat(downFloors);
  }

  return downFloors.concat(upFloors);
}
