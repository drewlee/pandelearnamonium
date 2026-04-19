function getUniqueClimbs(steps) {
  if (steps <= 2) {
    return steps;
  }

  let first = 1;
  let second = 2;

  for (let i = 3; i <= steps; i++) {
    let result = first + second;
    first = second;
    second = result;
  }

  return second;
}
