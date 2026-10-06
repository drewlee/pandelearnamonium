/**
 * You are provided a series of aerial-view pictures of the same coastal region, taken a
 * few minutes apart from each other around the time the tide rises. Each picture
 * consists of an n x n binary grid, where 0 represents a part of the region above
 * water, and 1 represents a part below water.
 *
 * - The tide appears from the left side and rises toward the right, so, in each
 *   picture, for each row, all the 1's will be before all the 0's.
 * - Once a region is under water, it stays under water.
 * - All pictures are different.
 *
 * Determine which picture shows the most even balance between regions above and below
 * water (i.e., where the number of 1's most closely equals the number of 0's). In the
 * event of a tie, return the earliest picture.
 *
 * Time: O(n^2 * log k), where k is the number of pictures, and n is the size of each grid.
 * Space: O(1)
 *
 * @param pictures - An array of n x n binary grids.
 * @returns Index of the most balanced picture.
 */
function tideAerialView(pictures: number[][][]): number {
  const gridLen = pictures[0].length;
  const gridSize = Math.pow(gridLen, 2);
  const half = gridSize / 2;

  let left = 0;
  let right = pictures.length - 1;
  let leftBoundary = -1;
  let rightBoundary = -1;

  // O(n^2) time complexity.
  // This can be improved to O(n * log n) by using binary search on each row.
  function getFillRatio(grid: number[][]): number {
    let fill = 0;

    for (const row of grid) {
      for (const col of row) {
        fill += col;
      }
    }

    return fill - half;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const ratio = getFillRatio(pictures[mid]);

    if (ratio === 0) {
      return mid;
    } else if (ratio < 0) {
      left = mid + 1;
      leftBoundary = mid;
    } else {
      right = mid - 1;
      rightBoundary = mid;
    }
  }

  if (leftBoundary > -1 && rightBoundary > -1) {
    const leftRatio = Math.abs(getFillRatio(pictures[leftBoundary]));
    const rightRatio = getFillRatio(pictures[rightBoundary]);

    return leftRatio <= rightRatio ? leftBoundary : rightBoundary;
  }

  if (leftBoundary > -1) {
    return leftBoundary;
  }

  return rightBoundary;
}

function runTests() {
  const tests: [number[][][], number][] = [
    [
      [
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [
          [1, 0, 0],
          [0, 0, 0],
          [1, 0, 0],
        ],
        [
          [1, 1, 0],
          [0, 0, 0],
          [1, 0, 0],
        ],
        [
          [1, 1, 0],
          [1, 1, 1],
          [1, 0, 0],
        ],
        [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 0],
        ],
      ],
      2,
    ],
    // 3 pictures with increasing water
    [
      [
        [
          [1, 0, 0],
          [1, 0, 0],
          [1, 0, 0],
        ],
        [
          [1, 1, 0],
          [1, 1, 0],
          [1, 0, 0],
        ],
        [
          [1, 1, 1],
          [1, 1, 1],
          [1, 0, 0],
        ],
      ],
      1,
    ],
    // 2 pictures
    [
      [
        [
          [1, 0],
          [0, 0],
        ],
        [
          [1, 1],
          [1, 0],
        ],
      ],
      0,
    ],
    // Incremental progression
    [
      [
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [
          [1, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [
          [1, 0, 0],
          [1, 0, 0],
          [0, 0, 0],
        ],
        [
          [1, 1, 0],
          [1, 0, 0],
          [0, 0, 0],
        ],
        [
          [1, 1, 1],
          [1, 0, 0],
          [0, 0, 0],
        ],
        [
          [1, 1, 1],
          [1, 1, 0],
          [0, 0, 0],
        ],
        [
          [1, 1, 1],
          [1, 1, 1],
          [0, 0, 0],
        ],
        [
          [1, 1, 1],
          [1, 1, 1],
          [1, 0, 0],
        ],
        [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 0],
        ],
        [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ],
      ],
      4,
    ],
    // Edge case - single picture
    [
      [
        [
          [1, 1],
          [0, 0],
        ],
      ],
      0,
    ],
    // Edge case - all water
    [
      [
        [
          [1, 1],
          [1, 1],
        ],
      ],
      0,
    ],
    // Edge case - all land
    [
      [
        [
          [0, 0],
          [0, 0],
        ],
      ],
      0,
    ],
  ];

  for (const [pictures, want] of tests) {
    const got = tideAerialView(pictures);
    if (got !== want) {
      throw new Error(
        `\ntideAerialView(${JSON.stringify(pictures)}): got: ${got}, want: ${want}\n`,
      );
    }
  }
}

runTests();
