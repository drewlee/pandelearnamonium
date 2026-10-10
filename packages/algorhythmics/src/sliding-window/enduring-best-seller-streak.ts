/**
 * Enduring Best Seller Streak
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/sliding-windows#unique-best-seller-streak}
 *
 * We are given an array, `bestSeller`, with the title of the most sold book for each
 * day over a given period. We are also given a number `k` with
 * `1 ≤ k ≤ bestSeller.length`.
 *
 * We need to return whether there is any k-day period where every day has the same
 * best-selling title.
 *
 * Time: O(n)
 * Space: O(k) - Can be improved to O(1) by using the "resetting window" pattern.
 *
 * @param bestSeller - An array of best selling book titles for each day.
 * @param k - Number of days.
 * @returns Whether each day in a k-day period has the same best-selling title.
 */
function hasEnduringBestSellerStreak(bestSeller: string[], k: number): boolean {
  const books = new Map<string, number>();
  let left = 0;
  let right = 0;

  while (right < bestSeller.length) {
    const count = books.get(bestSeller[right]) ?? 0;

    books.set(bestSeller[right], count + 1);
    right++;

    const windowSize = right - left;

    if (windowSize === k) {
      if (books.size === 1) {
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
    [['book3', 'book1', 'book3', 'book3', 'book2'], 3, false],
    // Example 2 from the book
    [['book3', 'book1', 'book3', 'book3', 'book2'], 2, true],
    [['book1', 'book1', 'book2', 'book1'], 2, true],
    // Edge case - k=1
    [['book1', 'book2'], 1, true],
    // Edge case - k=len(bestSeller)
    [['book1', 'book1', 'book1'], 3, true],
    // no same sequence possible
    [['book1', 'book2', 'book1'], 2, false],
  ];
  for (const [bestSeller, k, want] of tests) {
    const got = hasEnduringBestSellerStreak(bestSeller, k);
    if (got !== want) {
      throw new Error(
        `\nhasEnduringBestSellerStreak(${JSON.stringify(bestSeller)}, ${k}): got: ${got}, want ${want}\n`,
      );
    }
    // got = hasEnduringBestSellerStreak2(bestSeller, k);
    // if (got !== want) {
    //   throw new Error(
    //     `\nhasEnduringBestSellerStreak2(${JSON.stringify(bestSeller)}, ${k}): got: ${got}, want ${want}\n`,
    //   );
    // }
  }
}

runTests();
