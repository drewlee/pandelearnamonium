import canSum from '../../src/dynamic-programming/fcc-can-sum-bu.ts';

test.each([
  // Target of 0 is always reachable (empty sum)
  [0, [1, 2, 3], true],
  // Single value that equals the target
  [7, [7], true],
  // Target reachable using one value multiple times
  [6, [3], true],
  // Target reachable via multiple different values
  [7, [5, 3, 4, 7], true],
  [7, [2, 3, 5], true],
  // Target not reachable — no combination of values sums to it
  [7, [2, 4], false],
  [11, [5, 6, 10], true],
  // All values larger than the target
  [3, [5, 10], false],
  // Empty values array — nothing to sum with
  [5, [], false],
  // Large target not reachable
  [300, [7, 14], false],
  // Large target that is reachable
  [300, [7, 14, 1], true],
])('canSum(%i, %j) === %s', (target, values, expected) => {
  expect(canSum(target, values)).toBe(expected);
});
