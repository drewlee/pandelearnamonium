function getOldest(people) {
  const ageMap = new Map();
  let oldest = 0;

  for (const { name, age } of people) {
    if (!ageMap.has(age)) {
      ageMap.set(age, []);
    }

    ageMap.get(age).push(name);
    oldest = Math.max(oldest, age);
  }

  return ageMap.get(oldest);
}
