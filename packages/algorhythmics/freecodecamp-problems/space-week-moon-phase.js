function moonPhase(dateString) {
  const baseTs = Date.parse('2000-01-06');
  const inputTs = Date.parse(dateString);
  const diff = (inputTs - baseTs) % (1000 * 60 * 60 * 24 * 28);
  const days = diff / 1000 / 60 / 60 / 24;

  if (days < 7) {
    return 'New';
  } else if (days < 14) {
    return 'Waxing';
  } else if (days < 21) {
    return 'Full';
  }
  return 'Waning';
}
