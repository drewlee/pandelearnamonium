function getGreeting(time) {
  const [hrs, min] = time.split(':').map((val) => Number(val));
  const timeAsMins = hrs * 60 + min;

  if (timeAsMins >= 300 && timeAsMins < 720) {
    return 'Good morning';
  } else if (timeAsMins >= 720 && timeAsMins < 1080) {
    return 'Good afternoon';
  } else if (timeAsMins >= 1080 && timeAsMins < 1320) {
    return 'Good evening';
  }

  return 'Good night';
}
