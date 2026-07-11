function isConsecutive(nums) {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] !== nums[i] - 1) {
      return false;
    }
  }
  return true;
}

function fiveDice(dice) {
  const diceCount = new Map();

  for (const die of dice) {
    const value = diceCount.get(die) ?? 0;
    diceCount.set(die, value + 1);
  }

  const size = diceCount.size;
  const counts = [...diceCount.values()];

  if (size === 1) {
    return 'five of a kind';
  } else if (size === 2) {
    if (counts.includes(4)) {
      return 'four of a kind';
    } else if (counts.includes(3)) {
      return 'full house';
    }
  } else if (size === 3) {
    if (counts.includes(3)) {
      return 'three of a kind';
    } else if (counts.includes(2)) {
      return 'two pair';
    }
  }

  dice.sort((a, b) => a - b);

  if (isConsecutive(dice)) {
    return 'large straight';
  } else if (isConsecutive(dice.slice(0, -1)) || isConsecutive(dice.slice(1))) {
    return 'small straight';
  }

  if (counts.includes(2)) {
    return 'pair';
  }

  return 'no pair';
}
