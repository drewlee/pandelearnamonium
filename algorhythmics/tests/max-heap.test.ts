import MaxHeap from '../src/max-heap.ts';
import isSorted from './helpers/is-sorted.ts';

test('Creates an instance with defaults', () => {
  const maxHeap = new MaxHeap();

  expect(maxHeap.heap).not.toBeNull();
  expect(maxHeap.heap.length).toBe(0);
});

test('Inserts a value into the heap', () => {
  const maxHeap = new MaxHeap();
  const value = 3;

  maxHeap.insert(value);

  expect(maxHeap.heap.length).toBe(1);
  expect(maxHeap.heap).toStrictEqual([value]);
});

test('Inserts multiple values into the heap', () => {
  const maxHeap = new MaxHeap();
  const values = [4, 9, 3, 11, 1, 2];

  values.forEach((value) => maxHeap.insert(value));

  expect(maxHeap.heap.length).toBe(values.length);
  expect(maxHeap.heap[0]).toBe(values[3]); // 11
  expect(maxHeap.heap).toStrictEqual([11, 9, 3, 4, 1, 2]);
});

test('Removing from an empty heap returns `null`', () => {
  const maxHeap = new MaxHeap();
  const result = maxHeap.remove();

  expect(result).toBeNull();
});

test('Removes the value from a one item array', () => {
  const maxHeap = new MaxHeap();
  const value = 21;

  maxHeap.insert(value);

  const spy = vi.spyOn(maxHeap, 'heapifyDown');
  const result = maxHeap.remove();

  expect(result).toBe(value);
  expect(maxHeap.heap.length).toBe(0);
  expect(spy).not.toBeCalled();

  spy.mockRestore();
});

test('Removes the value from a two item array', () => {
  const maxHeap = new MaxHeap();
  const values = [5, 21];

  values.forEach((value) => maxHeap.insert(value));

  const spy = vi.spyOn(maxHeap, 'heapifyDown');
  const result = maxHeap.remove();

  expect(result).toBe(values[1]);
  expect(maxHeap.heap.length).toBe(1);
  expect(spy).toHaveBeenCalledOnce();

  spy.mockRestore();
});

test("Removing each subsequent value gets the heap's maximum value", () => {
  const maxHeap = new MaxHeap();
  const values = [99, 13, 6, 32, 16, 1, 3, 7, 0, 4, -100];

  values.forEach((value) => maxHeap.insert(value));

  const expected = [99, 32, 16, 13, 7, 6, 4, 3, 1, 0, -100];
  const result: number[] = [];

  while (maxHeap.heap.length) {
    result.push(maxHeap.remove()!);
  }

  expect(result).toStrictEqual(expected);
});

describe('Sorting', () => {
  test('Returns an empty array when given an empty array', () => {
    const values = [];
    const maxHeap = new MaxHeap();
    const result = maxHeap.sort(values);

    expect(result).toStrictEqual([]);
  });

  test('Returns an array of one element when given an array of one element', () => {
    const values = [1];
    const maxHeap = new MaxHeap();
    const result = maxHeap.sort(values);

    expect(result).toStrictEqual(values);
  });

  test('Sorts the array of numbers', () => {
    const values = [6, 2, 4, 7, 1, 3];
    const maxHeap = new MaxHeap();
    const result = maxHeap.sort(values);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a small array', () => {
    const values = [1, 3];
    const maxHeap = new MaxHeap();
    const result = maxHeap.sort(values);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a large array', () => {
    const length = 100;
    const values = new Array(length).fill(null).map((_, index) => index + 1);
    const maxHeap = new MaxHeap();
    const result = maxHeap.sort(values);

    expect(isSorted(result)).toBeTruthy();
  });
});

describe('Sorting in-place', () => {
  test('Returns an empty array when given an empty array', () => {
    const values = [];
    const maxHeap = new MaxHeap();
    const result = maxHeap.sortInPlace(values);

    expect(result).toStrictEqual([]);
  });

  test('Returns an array of one element when given an array of one element', () => {
    const values = [1];
    const maxHeap = new MaxHeap();
    const result = maxHeap.sortInPlace(values);

    expect(result).toStrictEqual(values);
  });

  test('Sorts the array of numbers', () => {
    const values = [6, 2, 4, 7, 1, 3];
    const maxHeap = new MaxHeap();
    const result = maxHeap.sortInPlace(values);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a small array', () => {
    const values = [3, 1];
    const maxHeap = new MaxHeap();
    const result = maxHeap.sortInPlace(values);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a large array', () => {
    const length = 100;
    const values = new Array(length).fill(null).map((_, index) => length - index);
    const maxHeap = new MaxHeap();
    const result = maxHeap.sortInPlace(values);

    expect(isSorted(result)).toBeTruthy();
  });
});
