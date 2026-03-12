function isValidDominoChain(dominoes) {
  for (let i = 1; i < dominoes.length; i++) {
    const prev = dominoes[i - 1];
    const curr = dominoes[i];

    if (prev[1] !== curr[0]) {
      return false;
    }
  }

  return true;
}
