import howSum from '../../src/dynamic-programming/fcc-how-sum-bu.ts';

// Cases where no combination of values can reach the target
test.each([
  [7, [2, 4]],
  [11, [4, 6]],
  [300, [7, 14]],
  [3, [5, 10]],
  [1, []],
])('howSum(%i, %j) === null', (target, values) => {
  expect(howSum(target, values)).toBeNull();
});

// Cases where a valid combination exists — assert the returned array
// sums to the target and only contains values from the input array.
// The function returns one valid combination, not a specific one.
test.each([
  [0, [1, 2, 3]],
  [7, [2, 3]],
  [7, [5, 3, 4, 7]],
  [7, [7]],
  [8, [2, 3, 5]],
  [6, [3]],
  [10, [2, 5]],
  [13, [3, 5, 11]],
])('howSum(%i, %j) returns a valid combination', (target, values) => {
  const result = howSum(target, values);

  expect(result).not.toBeNull();
  expect(result!.reduce((sum, n) => sum + n, 0)).toBe(target);
  expect(result!.every((n) => values.includes(n))).toBe(true);
});
