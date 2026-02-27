/*
A tuple is a trio of items, grouped with parentheses:
"(4, 5, 3), (6, 2, 3), (9, 3, 4)"

Write code which can accept the tuple input as a string and convert it to a data structure.
Then, write the following function:

`multiply(n);`

Multiplies the nth item of each tuple, and returns the result.

For example:
multiply(2) = 5 * 2 * 3 = 30
*/

/**
 * Transforms the input string of tuples into a two-dimensional array.
 * Time: O(n)
 * Space: O(n)
 *
 * @param tuple - The string of tuples.
 * @returns A two-dimensional array of numbers.
 */
export function parseTuple(tuple: string): number[][] {
  // 1. Replace all parens with square brackets.
  // 2. Add leading and trailing square brackets to create a 2D array.
  // 3. Convert the string to an array using JSON.parse.
  tuple = tuple.replace(/[()]/g, (match) => (match === '(' ? '[' : ']'));
  tuple = `[${tuple}]`;

  const result = JSON.parse(tuple) as number[][];

  return result;
}

/**
 * Multiplies the nth item of each tuple from the input array.
 * Time: O(n)
 * Space: O(1)
 *
 * @param tuple - The array of tuples.
 * @param n - The nth item to multiply.
 * @returns The resulting product.
 */
export function tupleMultiply(tuple: number[][], n: number): number {
  if (!tuple.length) {
    return 0;
  }

  const result = tuple.reduce((product, arr) => {
    const index = n - 1;

    if (index < arr.length) {
      return (product *= arr[n - 1]);
    }

    return 0;
  }, 1);

  return result;
}
