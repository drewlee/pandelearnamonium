function jbelmu(text) {
  const words = text.split(' ');
  const result = [];

  for (const word of words) {
    if (word.length <= 3) {
      result.push(word);
      continue;
    }

    const sub = word.slice(1, word.length - 1);
    const split = sub.split('');
    split.sort();

    const joined = split.join('');
    const jumbled = word[0] + joined + word[word.length - 1];

    result.push(jumbled);
  }

  return result.join(' ');
}
