function detectRoast(beans) {
  let points = 0;

  for (const bean of beans) {
    if (bean === "'") {
      points += 1;
    } else if (bean === '-') {
      points += 2;
    } else if (bean === '.') {
      points += 3;
    }
  }

  const average = points / beans.length;

  if (average < 1.75) {
    return 'Light';
  } else if (average <= 2.5) {
    return 'Medium';
  } else {
    return 'Dark';
  }
}
