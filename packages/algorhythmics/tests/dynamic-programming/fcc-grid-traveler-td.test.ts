import gridTraveler from '../../src/dynamic-programming/fcc-grid-traveler-td.ts';

test.each([
  // Zero-dimension grids have no valid path
  [0, 0, 0],
  [0, 1, 0],
  [1, 0, 0],
  // 1x1 grid has exactly one path (you're already there)
  [1, 1, 1],
  // Known values
  [2, 2, 2],
  [2, 3, 3],
  [3, 2, 3],
  [3, 3, 6],
  [4, 4, 20],
  [5, 5, 70],
  // Symmetry: swapping rows and cols yields the same result
  [3, 7, 28],
  [7, 3, 28],
  // Larger grid
  [18, 18, 2333606220],
])('gridTraveler(%i, %i) === %i', (rows, cols, expected) => {
  expect(gridTraveler(rows, cols)).toBe(expected);
});
