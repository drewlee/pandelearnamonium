function getFoodChain(pairs) {
  const predators = pairs.map((entry) => entry[0]);
  const prey = pairs.map((entry) => entry[1]);
  const result = [];
  let currApex = '';

  for (const predator of predators) {
    if (!prey.includes(predator)) {
      currApex = predator;
    }
  }

  while (currApex) {
    result.push(currApex);

    const index = predators.indexOf(currApex);
    currApex = index > -1 ? prey[index] : null;
  }

  return result;
}
