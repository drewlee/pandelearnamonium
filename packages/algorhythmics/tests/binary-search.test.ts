import { binarySearch, binarySearchRecursive } from '../src/binary-search.ts';

describe('Iterative binary search', () => {
  test('Returns the expected index', () => {
    const arr = [1, 2, 3];
    let result = binarySearch(arr, 1);

    expect(result).toBe(0);

    result = binarySearch(arr, 2);
    expect(result).toBe(1);

    result = binarySearch(arr, 3);
    expect(result).toBe(2);
  });

  test('Returns `-1` when the target is not found', () => {
    const arr = [1, 2, 3];
    const result = binarySearch(arr, 4);

    expect(result).toBe(-1);
  });

  test('Returns `-1` for an empty array', () => {
    const arr = [];
    const result = binarySearch(arr, 99);

    expect(result).toBe(-1);
  });

  test('Returns the expected index for a small array', () => {
    const arr = [99];
    const result = binarySearch(arr, 99);

    expect(result).toBe(0);
  });

  test('Returns the expected index for a large array', () => {
    const arr = new Array(100).fill(null).map((_, index) => index + 1);
    const result = binarySearch(arr, 75);

    expect(result).toBe(74);
  });
});

describe('Recursive binary search', () => {
  test('Returns the expected index', () => {
    const arr = [1, 2, 3];
    let result = binarySearchRecursive(arr, 1);

    expect(result).toBe(0);

    result = binarySearchRecursive(arr, 2);
    expect(result).toBe(1);

    result = binarySearchRecursive(arr, 3);
    expect(result).toBe(2);
  });

  test('Returns `-1` when the target is not found', () => {
    const arr = [1, 2, 3];
    const result = binarySearchRecursive(arr, 4);

    expect(result).toBe(-1);
  });

  test('Returns `-1` for an empty array', () => {
    const arr = [];
    const result = binarySearchRecursive(arr, 99);

    expect(result).toBe(-1);
  });

  test('Returns the expected index for a small array', () => {
    const arr = [99];
    const result = binarySearchRecursive(arr, 99);

    expect(result).toBe(0);
  });

  test('Returns the expected index for a large array', () => {
    const arr = new Array(100).fill(null).map((_, index) => index + 1);
    const result = binarySearchRecursive(arr, 75);

    expect(result).toBe(74);
  });
});
