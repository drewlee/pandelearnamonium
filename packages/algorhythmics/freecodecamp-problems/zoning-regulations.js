const zoning = new Map([
  ['i', ['R', 'I']],
  ['A', ['C']],
  ['R', ['i', 'C']],
  ['I', ['i']],
  ['C', ['R', 'A']],
  ['', []],
]);

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function getZoneViolations(grid) {
  const violations = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const value = grid[i][j];
      const invalid = zoning.get(value);

      for (const dir of dirs) {
        const ni = dir[0] + i;
        const nj = dir[1] + j;

        if (
          ni >= 0 &&
          ni < grid.length &&
          nj >= 0 &&
          nj < grid[i].length &&
          invalid.includes(grid[ni][nj])
        ) {
          violations.push([i, j]);
          break;
        }
      }
    }
  }

  return violations;
}
