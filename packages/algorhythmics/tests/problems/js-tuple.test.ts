import { parseTuple, tupleMultiply } from '../../src/problems/js-tuple.ts';

describe('parseTuple', () => {
  test('Transforms tuple into an array', () => {
    const input = '(4, 5, 3), (6, 2, 3), (9, 3, 4)';
    const result = parseTuple(input);

    expect(result).toStrictEqual([
      [4, 5, 3],
      [6, 2, 3],
      [9, 3, 4],
    ]);
  });
});

describe('tupleMultiply', () => {
  test('Computes the product for the nth element in the tuple', () => {
    const input = [
      [4, 5, 3],
      [6, 2, 3],
      [9, 3, 4],
    ];
    const result = tupleMultiply(input, 2);

    expect(result).toBe(30);
  });

  test('Returns 0 for an invalid n input', () => {
    const input = [
      [4, 5, 3],
      [6, 2, 3],
      [9, 3, 4],
    ];
    const result = tupleMultiply(input, 5);

    expect(result).toBe(0);
  });

  test('Returns 0 for an invalid outer array', () => {
    const input = [];
    const result = tupleMultiply(input, 5);

    expect(result).toBe(0);
  });

  test('Returns 0 for invalid inner arrays', () => {
    const input = [[], [], []];
    const result = tupleMultiply(input, 5);

    expect(result).toBe(0);
  });
});
