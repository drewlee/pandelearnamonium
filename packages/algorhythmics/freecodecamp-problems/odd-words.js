function getOddWords(str) {
  return str
    .split(' ')
    .filter((word) => word.length % 2 !== 0)
    .join(' ');
}
