const ALPHA_BASE = 'a'.charCodeAt(0);

function getScore(word) {
  let score = 0;

  for (const letter of word) {
    const code = letter.toLowerCase().charCodeAt(0);
    let points = code - ALPHA_BASE + 1;

    if (letter === letter.toUpperCase()) {
      points *= 2;
    }

    score += points;
  }

  return score;
}

function battle(ourTeam, opponent) {
  const [ours, their] = [ourTeam, opponent].map((words) => words.split(' '));

  let ourWins = 0;
  let theirWins = 0;

  for (let i = 0; i < ours.length; i++) {
    const ourScore = getScore(ours[i]);
    const theirScore = getScore(their[i]);

    if (ourScore > theirScore) {
      ourWins++;
    } else if (ourScore < theirScore) {
      theirWins++;
    }
  }

  if (ourWins > theirWins) {
    return 'We win';
  } else if (ourWins < theirWins) {
    return 'We lose';
  }

  return 'Draw';
}
