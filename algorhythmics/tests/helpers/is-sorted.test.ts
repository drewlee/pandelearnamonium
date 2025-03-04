import isSorted from './is-sorted.ts';

test('Returns `true` when the array is sorted', () => {
  const arr = [1, 2, 3];
  const result = isSorted(arr);

  expect(result).toBeTruthy();
});

test('Returns `true` for duplicate elements', () => {
  const arr = [1, 1, 1];
  const result = isSorted(arr);

  expect(result).toBeTruthy();
});

test('Returns `false` when the array is not sorted', () => {
  const arr = [1, 3, 2];
  const result = isSorted(arr);

  expect(result).toBeFalsy();
});

test('Returns `true` for an array with one element', () => {
  const arr = [3];
  const result = isSorted(arr);

  expect(result).toBeTruthy();
});

test('Returns `true` for an empty array', () => {
  const arr = [];
  const result = isSorted(arr);

  expect(result).toBeTruthy();
});
