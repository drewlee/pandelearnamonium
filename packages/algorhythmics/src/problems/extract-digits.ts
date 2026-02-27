/**
 * Returns the extracted digits as an array from the input.
 * E.g., `386` is returned as `[3, 8, 6]`.
 *
 * @param num - The number to extract the digits from.
 * @returns The extracted digits as an array.
 */
export default function extractDigits(num: number): number[] {
  const result: number[] = [];

  while (num > 0) {
    result.push(num % 10);
    num = Math.floor(num / 10);
  }

  // Handle case where num = 0.
  return result.length ? result.reverse() : [0];
}
