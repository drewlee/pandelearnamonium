import extractDigits from '../../src/problems/extract-digits.ts';

describe('extractDigits', () => {
  test('Extracts digits from the specified number', () => {
    const result = extractDigits(1234);
    expect(result).toStrictEqual([1, 2, 3, 4]);
  });

  test('Extracts a single digit', () => {
    const result = extractDigits(9);
    expect(result).toStrictEqual([9]);
  });

  test('Extracts a digits from a large number', () => {
    const result = extractDigits(8730973698478);
    expect(result).toStrictEqual([8, 7, 3, 0, 9, 7, 3, 6, 9, 8, 4, 7, 8]);
  });

  test('Handles zero', () => {
    const result = extractDigits(0);
    expect(result).toStrictEqual([0]);
  });
});
