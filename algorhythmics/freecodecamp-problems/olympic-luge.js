function getFastestSpeed(times) {
  const distance = [320, 280, 350, 300, 250];
  const speed = times.map((time, idx) => distance[idx] / time);
  let maxSpeed = -Infinity;
  let maxSpeedIdx = -1;

  for (let i = 0; i < speed.length; i++) {
    if (speed[i] > maxSpeed) {
      maxSpeed = speed[i];
      maxSpeedIdx = i;
    }
  }

  return `The luger's fastest speed was ${maxSpeed.toFixed(2)} m/s on segment ${maxSpeedIdx + 1}.`;
}
