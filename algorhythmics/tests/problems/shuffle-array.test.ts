import shuffleArray, { getRandomInRange } from '../../src/problems/shuffle-array.ts';

describe('getRandomInRange', () => {
  test('Generates a random number for the given range', () => {
    const rangeStart = 0;
    const rangeEnd = 3;
    const result = getRandomInRange(rangeStart, rangeEnd);

    expect(result).toBeGreaterThanOrEqual(rangeStart);
    expect(result).toBeLessThan(rangeEnd);
  });

  test('Generates a random number when called with one argument', () => {
    const rangeStart = 0;
    const rangeEnd = 3;
    const result = getRandomInRange(rangeEnd);

    expect(result).toBeGreaterThanOrEqual(rangeStart);
    expect(result).toBeLessThan(rangeEnd);
  });

  test('Clamped range always returns the range start value', () => {
    const rangeStart = 3;
    const rangeEnd = 4;
    const result = getRandomInRange(rangeStart, rangeEnd);

    expect(result).toBe(rangeStart);
  });

  test('Invalid arguments throw an exception', () => {
    const rangeStart = 5;
    const rangeEnd = 1;

    expect(() => getRandomInRange(rangeStart, rangeEnd)).toThrowError(
      'Range start parameter cannot exceed range end parameter',
    );
  });
});

describe('shuffleArray', () => {
  test('Shuffles array in-place', () => {
    const values = new Array(10).fill(null).map((_, i) => i + 1);
    const valuesCopy = [...values];

    shuffleArray(values);
    expect(values).not.toStrictEqual(valuesCopy);
    expect(values.length).toBe(valuesCopy.length);
  });

  test('Shuffles increasing array', () => {
    const values = new Array(100).fill(null).map((_, i) => i + 1);
    const valuesCopy = [...values];
    const result = shuffleArray(values);

    expect(result).not.toStrictEqual(valuesCopy);
    expect(result.length).toBe(valuesCopy.length);
    expect(
      result.sort((a, b) => a - b),
      'No values are omitted or duplicated',
    ).toStrictEqual(valuesCopy);
  });

  test('Shuffles decreasing array', () => {
    const values = new Array(100).fill(null).map((_, i, a) => a.length - i);
    const valuesCopy = [...values];
    const result = shuffleArray(values);

    expect(result).not.toStrictEqual(valuesCopy);
    expect(result.length).toBe(valuesCopy.length);
    expect(
      result.sort((a, b) => b - a),
      'No values are omitted or duplicated',
    ).toStrictEqual(valuesCopy);
  });

  test('Returns an empty array if given an empty array', () => {
    const result = shuffleArray([]);
    expect(result).toStrictEqual([]);
  });

  test('Returns an array of one element if given an array of one element', () => {
    const result = shuffleArray([3]);
    expect(result).toStrictEqual([3]);
  });
});
