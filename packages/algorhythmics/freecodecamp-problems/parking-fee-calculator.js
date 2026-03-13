function getNumForTime(time) {
  const parts = time.split(':');
  const hour = Number(parts[0]);
  const mins = Number(parts[1]) / 60;

  return hour + mins;
}

function calculateParkingFee(parkTime, pickupTime) {
  const parkTimeNum = getNumForTime(parkTime);
  let pickupTimeNum = getNumForTime(pickupTime);
  let cost = 0;

  if (pickupTimeNum < parkTimeNum) {
    pickupTimeNum += 24;
    cost += 10;
  }

  const totalTime = Math.ceil(pickupTimeNum - parkTimeNum);
  cost += totalTime * 3;
  cost = Math.max(cost, 5);

  return `$${cost}`;
}
