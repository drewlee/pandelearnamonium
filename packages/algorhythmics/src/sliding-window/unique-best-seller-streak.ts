/**
 * We are given an array, `bestSeller`, with the title of the most sold book for each
 * day over a given period. We are also given a number `k` with
 * `1 ≤ k ≤ bestSeller.length`.
 *
 * We need to return whether there is any k-day period where each day has a different
 * best-selling title.
 *
 * Time: O(n)
 * Space: O(k)
 *
 * @param bestSeller - An array of best selling book titles for each day.
 * @param k - Number of days.
 * @returns Whether each day in a k-day period has a different best-selling title.
 */
function hasUniqueKDays(bestSeller: string[], k: number): boolean {
  const books = new Map<string, number>();
  let left = 0;
  let right = 0;

  while (right < bestSeller.length) {
    const count = books.get(bestSeller[right]) ?? 0;
    books.set(bestSeller[right], count + 1);
    right++;

    const windowSize = right - left;

    if (windowSize === k) {
      if (books.size === k) {
        return true;
      }

      const count = books.get(bestSeller[left])! - 1;
      books.set(bestSeller[left], count);

      if (count === 0) {
        books.delete(bestSeller[left]);
      }

      left++;
    }
  }

  return false;
}

function runTests() {
  const tests: [string[], number, boolean][] = [
    // Example 1 from the book
    [['book3', 'book1', 'book3', 'book3', 'book2', 'book3', 'book4', 'book3'], 3, true],
    // Example 2 from the book
    [['book3', 'book1', 'book3', 'book3', 'book2', 'book3', 'book4', 'book3'], 4, false],
    // Edge case - k=1
    [['book1', 'book2'], 1, true],
    // Edge case - k=len(bestSeller)
    [['book1', 'book2', 'book3'], 3, true],
    // no unique sequence possible
    [['book1', 'book1', 'book1'], 2, false],
  ];
  for (const [bestSeller, k, want] of tests) {
    const got = hasUniqueKDays(bestSeller, k);
    if (got !== want) {
      throw new Error(
        `\nhasUniqueKDays(${JSON.stringify(bestSeller)}, ${k}): got: ${got}, want ${want}\n`,
      );
    }
  }
}

runTests();
