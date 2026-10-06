/**
 * Water Refilling
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/binary-search#water-refilling}
 *
 * You have an empty container with a capacity of a gallons of water and another
 * container with a capacity of `b` gallons. Return how many times you can pour the
 * second container full of water into the first one without overflowing. Assume that
 * `a > b`. Using the division operator is not allowed.
 *
 * Time: O(log(a/b))
 * Space: O(1)
 *
 * @param a - Capacity of the first container.
 * @param b - Capacity of the second container.
 * @returns How many times the second container can be poured into the first.
 */
function numRefills(a: number, b: number): number {
  let boundary = 0;

  // Use exponential growth to find the upper bound
  let left = 1;
  while (b * 2 * left <= a) {
    left *= 2;
  }

  let right = left * 2;

  while (left <= right) {
    const mid = left + Math.floor((right - left) >> 1);

    if (mid * b <= a) {
      boundary = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return boundary;
}

function runTests() {
  const tests = [
    // Basic cases
    [10, 2, 5],
    [10, 3, 3],
    [10, 4, 2],
    [10, 5, 2],
    // Large numbers
    [1000000, 1, 1000000],
    // Large numbers with multiple refills
    [1000000, 500000, 2],
    // Random cases
    [18, 5, 3],
    [182983, 90, 2033],
  ];

  for (const [a, b, expected] of tests) {
    const result = numRefills(a, b);
    if (result !== expected) {
      throw new Error(`\nnumRefills(${a}, ${b}): got ${result}, want ${expected}\n`);
    }
  }
}

runTests();
