function countMedals(winners) {
  const count = new Map();

  for (let row of winners) {
    for (let i = 0; i < row.length; i++) {
      const country = row[i];
      if (!count.has(country)) {
        count.set(country, [0, 0, 0, 0]);
      }
      const arr = count.get(country);
      const newArr = [...arr];

      newArr[i]++;
      newArr[3]++;
      count.set(country, newArr);
    }
  }

  const rows = [];
  for (const [key, values] of count) {
    let row = [key, ...values];
    rows.push(row);
  }

  // First, sort alphabetically by country
  rows.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    } else if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  });
  // The, sort by gold medal count
  rows.sort((a, b) => b[1] - a[1]);

  const headers = 'Country,Gold,Silver,Bronze,Total';
  const out = rows.map((row) => row.join(','));
  out.unshift(headers);

  return out.join('\n');
}
