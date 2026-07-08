function triageIssue(ms, message) {
  const days = ms / 24 / 60 / 60 / 1000;

  if (days < 7) {
    return 'leave it';
  } else if (message.toLowerCase().includes('bump')) {
    return 'close it';
  }

  return 'bump it';
}
