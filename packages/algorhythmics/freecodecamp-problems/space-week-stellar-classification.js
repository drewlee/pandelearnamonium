function classification(temp) {
  if (temp >= 30000) {
    return 'O';
  } else if (temp >= 10000) {
    return 'B';
  } else if (temp >= 7500) {
    return 'A';
  } else if (temp >= 6000) {
    return 'F';
  } else if (temp >= 5200) {
    return 'G';
  } else if (temp >= 3700) {
    return 'K';
  } else {
    return 'M';
  }
}
