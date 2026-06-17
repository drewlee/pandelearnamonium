function cast(spells) {
  const spellsRef = {
    f: { category: 'destruction', score: 3 },
    l: { category: 'destruction', score: 3 },
    i: { category: 'control', score: 2 },
    w: { category: 'control', score: 2 },
    h: { category: 'restoration', score: 1 },
    s: { category: 'restoration', score: 1 },
  };

  let multiplier = 1;
  let total = 0;

  for (let i = 0; i < spells.length; i++) {
    const spell = spells[i];
    const { category, score } = spellsRef[spell];

    if (i > 0 && spellsRef[spells[i - 1]].category !== category) {
      multiplier += 1;
    } else {
      multiplier = 1;
    }

    total += score * multiplier;
  }

  return total;
}
