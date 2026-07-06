function getLowercaseWords(str) {
  return str
    .split(' ')
    .filter((word) => word.toLowerCase() === word)
    .join(' ');
}
