const rankToValue = new Map([
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
  ['T', 10],
  ['J', 11],
  ['Q', 12],
  ['K', 13],
  ['A', 14],
]);

function isStraight(ranks) {
  const aceIdx = ranks.indexOf('A');
  const hasAce = aceIdx > -1;

  if (hasAce) {
    ranks.splice(aceIdx, 1);
  }

  const rankNums = ranks.map((rank) => rankToValue.get(rank));
  rankNums.sort((a, b) => a - b);

  const isStrictAsc = rankNums.every((rank, i) => i === 0 || rankNums[i - 1] === rank - 1);

  if (!hasAce) {
    return isStrictAsc;
  }

  return isStrictAsc && (rankNums[0] === 2 || rankNums[rankNums - 1] === 13);
}

function getBestHand(cards) {
  const rankCount = new Map();
  const suitCount = new Map();

  for (const card of cards) {
    const rank = card[0];
    const suit = card[1];

    let count = rankCount.get(rank) ?? 0;
    rankCount.set(rank, count + 1);

    count = suitCount.get(suit) ?? 0;
    suitCount.set(suit, count + 1);
  }

  if (suitCount.size === 1) {
    if (['A', 'K', 'Q', 'J', 'T'].every((rank) => rankCount.has(rank))) {
      return 'Royal Flush';
    }

    if (isStraight([...rankCount.keys()])) {
      return 'Straight Flush';
    }

    return 'Flush';
  }

  const values = [...rankCount.values()];

  if (rankCount.size === 2) {
    if (values.includes(4)) {
      return 'Four of a Kind';
    }

    if (values.includes(3) && values.includes(2)) {
      return 'Full House';
    }
  }

  if (rankCount.size === 3) {
    if (values.includes(3)) {
      return 'Three of a Kind';
    }

    if (values.includes(2)) {
      return 'Two Pair';
    }
  }

  if (values.includes(2)) {
    return 'Pair';
  }

  if (isStraight([...rankCount.keys()])) {
    return 'Straight';
  }

  return 'High Card';
}
