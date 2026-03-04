function cardValues(cards) {
  return cards.map((card) => {
    const rank = card.slice(0, card.length - 1);
    if (rank === 'A') {
      return 1;
    } else if (rank === 'J' || rank === 'Q' || rank === 'K') {
      return 10;
    } else {
      return Number(rank);
    }
  });
}
