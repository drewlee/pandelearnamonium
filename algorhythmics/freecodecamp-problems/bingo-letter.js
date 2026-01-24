function getBingoLetter(n) {
  if (n < 16) {
    return 'B';
  } else if (n < 31) {
    return 'I';
  } else if (n < 46) {
    return 'N';
  } else if (n < 61) {
    return 'G';
  } else {
    return 'O';
  }
}
