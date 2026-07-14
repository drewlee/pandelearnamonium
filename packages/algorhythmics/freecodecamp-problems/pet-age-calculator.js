function petYears(pet, age) {
  const multipliers = new Map([
    ['dog', 7],
    ['cat', 6],
    ['rabbit', 8],
    ['hamster', 30],
    ['guinea pig', 12],
    ['goldfish', 6],
    ['bird', 5],
  ]);

  return age * multipliers.get(pet);
}
