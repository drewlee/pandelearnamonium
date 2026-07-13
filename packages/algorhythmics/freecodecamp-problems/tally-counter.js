function getTallyCount(str) {
  const groups = str.split(' ');
  let count = 0;

  if (groups.length >= 1) {
    count += (groups.length - 1) * 5;
  }

  for (const value of groups[groups.length - 1]) {
    if (value === '|' || value === '/') {
      count++;
    }
  }

  return count;
}
