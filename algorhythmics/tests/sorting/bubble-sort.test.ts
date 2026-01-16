import { bubbleSort, bubbleSortVariation } from '../../src/sorting/bubble-sort.ts';
import isSorted from '../helpers/is-sorted.ts';

describe('bubbleSort', () => {
  test('Returns an empty array when given an empty array', () => {
    const arr = [];
    const result = bubbleSort(arr);

    expect(result).toStrictEqual([]);
  });

  test('Returns an array of one element when given an array of one element', () => {
    const arr = [1];
    const result = bubbleSort(arr);

    expect(result.length).toBe(1);
  });

  test('Mutates the original array', () => {
    const arr = [7, 3, 1, 5];
    expect(isSorted(arr)).toBeFalsy();

    bubbleSort(arr);
    expect(isSorted(arr)).toBeTruthy();
  });

  test('Sorts the array of numbers', () => {
    const arr = [6, 2, 4, 7, 1, 3];
    const result = bubbleSort(arr);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a small array', () => {
    const arr = [3, 1];
    const result = bubbleSort(arr);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a large array', () => {
    const length = 100;
    const arr = new Array(length).fill(null).map((_, index) => length - index);
    const result = bubbleSort(arr);

    expect(isSorted(result)).toBeTruthy();
  });
});

describe('bubbleSortVariation', () => {
  test('Returns an empty array when given an empty array', () => {
    const arr = [];
    const result = bubbleSortVariation(arr);

    expect(result).toStrictEqual([]);
  });

  test('Returns an array of one element when given an array of one element', () => {
    const arr = [1];
    const result = bubbleSortVariation(arr);

    expect(result.length).toBe(1);
  });

  test('Mutates the original array', () => {
    const arr = [7, 3, 1, 5];
    expect(isSorted(arr)).toBeFalsy();

    bubbleSortVariation(arr);
    expect(isSorted(arr)).toBeTruthy();
  });

  test('Sorts the array of numbers', () => {
    const arr = [6, 2, 4, 7, 1, 3];
    const result = bubbleSortVariation(arr);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a small array', () => {
    const arr = [3, 1];
    const result = bubbleSortVariation(arr);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a large array', () => {
    const length = 100;
    const arr = new Array(length).fill(null).map((_, index) => length - index);
    const result = bubbleSortVariation(arr);

    expect(isSorted(result)).toBeTruthy();
  });
});
