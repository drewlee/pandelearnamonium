/**
 * Generates a random number within the provided start and end range. If the function
 * is called with a single argument, the `rangeStart` value is used as the `rangeEnd`
 * with `rangeStart` defaulted to 0.
 *
 * @param rangeStart - Start of the range, inclusive.
 * @param rangeEnd - End of the range, exclusive.
 * @returns Random generated number.
 */
export function getRandomInRange(rangeStart: number, rangeEnd?: number): number {
  if (rangeEnd === undefined) {
    rangeEnd = rangeStart;
    rangeStart = 0;
  }

  if (rangeStart >= rangeEnd) {
    throw new Error('Range start parameter cannot exceed range end parameter');
  }

  return rangeStart + Math.floor((rangeEnd - rangeStart) * Math.random());
}

/**
 * Shuffles in-place the provided array of values.
 *
 * @param values - Array of values.
 * @returns Shuffled array.
 */
export default function shuffleArray<T>(values: T[]): T[] {
  const { length } = values;

  if (length <= 1) {
    return values;
  }

  for (let i = 0; i < length - 1; i++) {
    // For the given index, get a random int for the range of
    // `i + 1` through the end of the array, i.e., `values.length`.
    const randomIndex = getRandomInRange(i + 1, length);

    // Swap values at the current index with random generated index.
    [values[i], values[randomIndex]] = [values[randomIndex], values[i]];
  }

  return values;
}
