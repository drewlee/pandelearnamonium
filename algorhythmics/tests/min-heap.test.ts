import MinHeap from '../src/min-heap.ts';
import isSorted from './helpers/is-sorted.ts';

test('Creates an instance with defaults', () => {
  const minHeap = new MinHeap();

  expect(minHeap.heap).not.toBeNull();
  expect(minHeap.heap.length).toBe(0);
});

test('Inserts a value into the heap', () => {
  const minHeap = new MinHeap();
  const value = 3;

  minHeap.insert(value);

  expect(minHeap.heap.length).toBe(1);
  expect(minHeap.heap).toStrictEqual([value]);
});

test('Inserts multiple values into the heap', () => {
  const minHeap = new MinHeap();
  const values = [4, 9, 3, 11, 1, 2];

  values.forEach((value) => minHeap.insert(value));

  expect(minHeap.heap.length).toBe(values.length);
  expect(minHeap.heap[0]).toBe(values[4]); // 1
  expect(minHeap.heap).toStrictEqual([1, 3, 2, 11, 9, 4]);
});

test('Removing from an empty heap returns `null`', () => {
  const minHeap = new MinHeap();
  const result = minHeap.remove();

  expect(result).toBeNull();
});

test('Removes the value from a one item array', () => {
  const minHeap = new MinHeap();
  const value = 21;

  minHeap.insert(value);

  const spy = vi.spyOn(minHeap, 'heapifyDown');
  const result = minHeap.remove();

  expect(result).toBe(value);
  expect(minHeap.heap.length).toBe(0);
  expect(spy).not.toBeCalled();

  spy.mockRestore();
});

test('Removes the value from a two item array', () => {
  const minHeap = new MinHeap();
  const values = [21, 5];

  values.forEach((value) => minHeap.insert(value));

  const spy = vi.spyOn(minHeap, 'heapifyDown');
  const result = minHeap.remove();

  expect(result).toBe(values[1]);
  expect(minHeap.heap.length).toBe(1);
  expect(spy).toHaveBeenCalledOnce();

  spy.mockRestore();
});

test("Removing each subsequent value gets the heap's minimum value", () => {
  const minHeap = new MinHeap();
  const values = [99, 13, 6, 32, 16, 1, 3, 7, 0, 4, -100];

  values.forEach((value) => minHeap.insert(value));

  const expected = [-100, 0, 1, 3, 4, 6, 7, 13, 16, 32, 99];
  const result: number[] = [];

  while (minHeap.heap.length) {
    result.push(minHeap.remove()!);
  }

  expect(result).toStrictEqual(expected);
});

describe('Sorting', () => {
  test('Returns an empty array when given an empty array', () => {
    const values = [];
    const minHeap = new MinHeap();
    const result = minHeap.sort(values);

    expect(result).toStrictEqual([]);
  });

  test('Returns an array of one element when given an array of one element', () => {
    const values = [1];
    const minHeap = new MinHeap();
    const result = minHeap.sort(values);

    expect(result).toStrictEqual(values);
  });

  test('Sorts the array of numbers', () => {
    const values = [6, 2, 4, 7, 1, 3];
    const minHeap = new MinHeap();
    const result = minHeap.sort(values);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a small array', () => {
    const values = [3, 1];
    const minHeap = new MinHeap();
    const result = minHeap.sort(values);

    expect(isSorted(result)).toBeTruthy();
  });

  test('Sorts a large array', () => {
    const length = 100;
    const values = new Array(length).fill(null).map((_, index) => length - index);
    const minHeap = new MinHeap();
    const result = minHeap.sort(values);

    expect(isSorted(result)).toBeTruthy();
  });
});

describe('Sorting in-place', () => {
  test('Returns an empty array when given an empty array', () => {
    const values = [];
    const minHeap = new MinHeap();
    const result = minHeap.sortInPlace(values);

    expect(result.reverse()).toStrictEqual([]);
  });

  test('Returns an array of one element when given an array of one element', () => {
    const values = [1];
    const minHeap = new MinHeap();
    const result = minHeap.sortInPlace(values);

    expect(result).toStrictEqual(values);
  });

  test('Sorts the array of numbers', () => {
    const values = [6, 2, 4, 7, 1, 3];
    const minHeap = new MinHeap();
    const result = minHeap.sortInPlace(values);

    expect(isSorted(result.reverse())).toBeTruthy();
  });

  test('Sorts a small array', () => {
    const values = [3, 1];
    const minHeap = new MinHeap();
    const result = minHeap.sortInPlace(values);

    expect(isSorted(result.reverse())).toBeTruthy();
  });

  test('Sorts a large array', () => {
    const length = 100;
    const values = new Array(length).fill(null).map((_, index) => index + 1);
    const minHeap = new MinHeap();
    const result = minHeap.sortInPlace(values);

    expect(isSorted(result.reverse())).toBeTruthy();
  });
});
