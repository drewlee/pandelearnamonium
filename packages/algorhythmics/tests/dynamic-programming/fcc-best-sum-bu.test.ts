import bestSum from '../../src/dynamic-programming/fcc-best-sum-bu.ts';

// Cases where no combination of values can reach the target
test.each([
  [7, [2, 4]],
  [300, [7, 14]],
  [3, [5, 10]],
  [1, []],
])('bestSum(%i, %j) === null', (target, values) => {
  expect(bestSum(target, values)).toBeNull();
});

// Cases where a valid combination exists — assert the returned array
// sums to the target, uses the fewest values possible, and only contains
// values from the input array.
test.each([
  [0, [1, 2, 3], 0],
  [7, [5, 3, 4, 7], 1],
  [7, [2, 3], 3],
  [8, [2, 3, 5], 2],
  [8, [1, 4, 5], 2],
  [100, [1, 2, 5, 25], 4],
])('bestSum(%i, %j) returns shortest combination of length %i', (target, values, minLength) => {
  const result = bestSum(target, values);

  expect(result).not.toBeNull();
  expect(result!.length).toBe(minLength);
  expect(result!.reduce((sum, n) => sum + n, 0)).toBe(target);
  expect(result!.every((n) => values.includes(n))).toBe(true);
});
