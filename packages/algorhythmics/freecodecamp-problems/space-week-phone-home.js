function sendMessage(route) {
  const speed = 300000;
  const delay = 0.5;

  let duration = 0;
  for (const distance of route) {
    duration += distance / speed;
  }

  duration += (route.length - 1) * delay;
  const result = Number(duration.toFixed(4));

  return result;
}
