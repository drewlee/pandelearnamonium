function getMood(genre, bpm) {
  switch (genre) {
    case 'classical':
      if (bpm < 110) {
        return 'focus';
      }
      return 'happy';
    case 'electronic':
      if (bpm < 90) {
        return 'focus';
      } else if (bpm < 135) {
        return 'happy';
      }
      return 'hype';
    case 'pop':
      return 'happy';
    case 'rock':
      if (bpm < 130) {
        return 'happy';
      }
      return 'hype';
    default:
      return 'unknown';
  }
}
