function getEmojiPhrase(str) {
  const emoji = {
    '👶': 'baby',
    '🐱': 'cat',
    '🐕': 'dog',
    '🐟': 'fish',
    '🥵': 'hot',
    '🧊': 'ice',
    '🪨': 'rock',
    '🦈': 'shark',
    '🍲': 'soup',
    '⭐': 'star',
  };
  let words = [];

  for (const char of str) {
    words.push(emoji[char]);
  }

  return words.join(' ');
}
