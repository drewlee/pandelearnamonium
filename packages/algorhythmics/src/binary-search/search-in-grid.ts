/**
 * Search in Sorted Grid
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/binary-search#search-in-sorted-grid}
 *
 * You are given a 2D grid of integers, grid, where each row is sorted (without
 * duplicates), and the last value in each row is smaller than the first value in the
 * following row. You are also given a target value, target. If the target is in the
 * grid, return an array with its row and column indices. Otherwise, return [-1, -1].
 *
 * @param grid - Grid to search in.
 * @param target - Value to find.
 * @returns The row and column indices of the target value.
 */
function searchInSortedGrid(grid: number[][], target: number): [number, number] {
  const numRows = grid.length;
  const numCols = grid[0].length;
  let left = 0;
  let right = numRows * numCols - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const currRow = Math.floor(mid / numCols);
    const currCol = mid % numCols;
    const currVal = grid[currRow][currCol];

    if (currVal === target) {
      return [currRow, currCol];
    } else if (currVal < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return [-1, -1];
}

function runTests() {
  const tests: [number[][], number, [number, number]][] = [
    [
      [
        [1, 3, 5],
        [7, 9, 11],
        [13, 15, 17],
      ],
      9,
      [1, 1],
    ], // Example 1
    [
      [
        [1, 3, 5],
        [7, 9, 11],
      ],
      4,
      [-1, -1],
    ], // Example 2
    [
      [
        [2, 3],
        [4, 5],
      ],
      1,
      [-1, -1],
    ], // 2x2 grid, all grid after
    [
      [
        [1, 2],
        [3, 4],
      ],
      5,
      [-1, -1],
    ], // 2x2 grid, all grid before
    [
      [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      1,
      [0, 0],
    ], // 3x2 grid, first element
    [
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      6,
      [1, 2],
    ], // 2x3 grid, last element
    [[[7]], 7, [0, 0]], // Single element edge case
    [[[7]], 6, [-1, -1]], // Single element edge case (not found)
  ];

  for (const [grid, target, want] of tests) {
    const got = searchInSortedGrid(grid, target);
    if (JSON.stringify(got) !== JSON.stringify(want)) {
      throw new Error(
        `\nsearchInSortedGrid(${JSON.stringify(grid)}, ${target}): got: ${JSON.stringify(got)}, want: ${JSON.stringify(want)}\n`,
      );
    }
  }
}

runTests();
