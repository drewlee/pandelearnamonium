function getTargetCombinations(target, path, seen) {
  const sum = path.reduce((sum, value) => sum + value, 0);

  if (sum > target) {
    return 0;
  }

  const combo = JSON.stringify(path);

  if (seen.has(combo)) {
    return 0;
  }

  seen.add(combo);

  if (sum === target) {
    return 1;
  }

  let count = 0;

  for (let i = 0; i < path.length; i++) {
    if (path[i] < 6) {
      path[i]++;
      count += getTargetCombinations(target, path, seen);
      path[i]--;
    }
  }

  return count;
}

function getOdds(dice, target) {
  const enumerations = Math.pow(6, dice);
  const path = new Array(dice).fill(1);
  const count = getTargetCombinations(target, path, new Set());
  const odds = Math.round(enumerations / count);

  return `1 in ${odds}`;
}
