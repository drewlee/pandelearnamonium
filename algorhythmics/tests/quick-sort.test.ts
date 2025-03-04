import quickSort from '../src/quick-sort.ts';
import isSorted from './helpers/is-sorted.ts';

test('Does not return a value', () => {
  const arr = [3, 2, 1];
  const result = quickSort(arr);

  expect(result).toBeUndefined();
});

test('Results in an empty array when given an empty array', () => {
  const arr = [];

  quickSort(arr);
  expect(arr).toStrictEqual([]);
});

test('Results in array of one element when given an array of one element', () => {
  const arr = [1];

  quickSort(arr);
  expect(arr.length).toBe(1);
});

test('Sorts the array of numbers in-place', () => {
  const arr = [6, 2, 4, 7, 1, 3];
  quickSort(arr);

  expect(isSorted(arr)).toBeTruthy();
});

test('Sorts a small array', () => {
  const arr = [3, 1];
  quickSort(arr);

  expect(isSorted(arr)).toBeTruthy();
});

test('Sorts a large array', () => {
  const length = 100;
  const arr = new Array(length).fill(null).map((_, index) => length - index);

  quickSort(arr);
  expect(isSorted(arr)).toBeTruthy();
});
