import fibonacci from '../../src/dynamic-programming/fcc-fibonacci-bu.ts';

test.each([
  [1, 1],
  [2, 1],
  [3, 2],
  [4, 3],
  [5, 5],
  [6, 8],
  [7, 13],
  [8, 21],
  [9, 34],
  [10, 55],
  [20, 6765],
  [40, 102334155],
  [50, 12586269025],
])('fibonacci(%i) === %i', (n, expected) => {
  expect(fibonacci(n)).toBe(expected);
});
