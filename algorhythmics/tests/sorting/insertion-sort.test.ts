import { insertionSort, insertionSortVariation } from '../../src/sorting/insertion-sort.ts';
import isSorted from '../helpers/is-sorted.ts';

describe('insertionSort', () => {
  test('Returns an empty array when given an empty array', () => {
    const arr = [];
    const result = insertionSort(arr);

    expect(result).toStrictEqual([]);
  });

  test('Returns an array of one element when given an array of one element', () => {
    const arr = [1];
    const result = insertionSort(arr);

    expect(result).toStrictEqual([1]);
  });

  test('Sorts the array of numbers', () => {
    const arr = [6, 2, 4, 7, 1, 3];
    const result = insertionSort(arr);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a small array', () => {
    const arr = [3, 1];
    const result = insertionSort(arr);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a large array', () => {
    const length = 100;
    const arr = new Array(length).fill(null).map((_, index) => length - index);
    const result = insertionSort(arr);

    expect(isSorted(result)).toBeTruthy();
  });
});

describe('insertionSortVariation', () => {
  test('Returns an empty array when given an empty array', () => {
    const arr = [];
    const result = insertionSortVariation(arr);

    expect(result).toStrictEqual([]);
  });

  test('Returns an array of one element when given an array of one element', () => {
    const arr = [1];
    const result = insertionSortVariation(arr);

    expect(result).toStrictEqual([1]);
  });

  test('Sorts the array of numbers', () => {
    const arr = [6, 2, 4, 7, 1, 3];
    const result = insertionSortVariation(arr);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a small array', () => {
    const arr = [3, 1];
    const result = insertionSortVariation(arr);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a large array', () => {
    const length = 100;
    const arr = new Array(length).fill(null).map((_, index) => length - index);
    const result = insertionSortVariation(arr);

    expect(isSorted(result)).toBeTruthy();
  });
});
