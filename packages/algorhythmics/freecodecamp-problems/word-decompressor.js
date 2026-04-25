function decompress(str) {
  const words = str.split(' ');

  return words
    .map((word) => {
      const num = Number(word);

      if (Number.isNaN(num)) {
        return word;
      }

      return words[num - 1];
    })
    .join(' ');
}
