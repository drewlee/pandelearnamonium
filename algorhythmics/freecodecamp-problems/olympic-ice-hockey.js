function getSemifinalMatchups(teams) {
  const mult = [3, 2, 1, 0];

  const points = teams.map((team) => {
    const name = team.slice(0, 3);
    const record = team.slice(5).split('-');
    const total = record.reduce((total, value, i) => {
      return total + Number(value) * mult[i];
    }, 0);

    return [name, total];
  });

  points.sort((a, b) => b[1] - a[1]);

  const out = `The semi-final games will be ${points[0][0]} vs ${points[3][0]} and ${points[1][0]} vs ${points[2][0]}.`;

  return out;
}
