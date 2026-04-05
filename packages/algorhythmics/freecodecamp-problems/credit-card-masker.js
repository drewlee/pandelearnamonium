function mask(card) {
  let masked = '';

  for (let i = 0; i < card.length - 4; i++) {
    let char = card[i];

    if (char !== ' ' && char !== '-') {
      char = '*';
    }

    masked += char;
  }

  return masked + card.slice(-4);
}
