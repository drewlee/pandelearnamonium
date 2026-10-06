/**
 * Min Pages Per Day
 * {@link https://start.interviewing.io/beyond-ctci/part-vii-catalog/binary-search#min-pages-per-day}
 *
 * You have upcoming interviews and have selected specific chapters from BCtCI to read
 * beforehand. Given an array, `pageCounts`, where each element represents a chapter's
 * page count, and the number of days, `days`, until your interview, determine the
 * minimum number of pages you must read daily to finish on time. Assume that:
 * - You must read all the pages of a chapter before moving on to another one.
 * - If you finish a chapter on a given day, you practice for the rest of the day and
 *   don't start the next chapter until the next day.
 * - `len(page_counts) <= days`.
 *
 * Time: O(n * log m)
 * Space: O(1)
 *
 * @param pageCounts - Number of pages per chapter.
 * @param days - Days until the interview.
 * @returns Minimum number of pages to read to finish on time.
 */
function minPagesPerDay(pageCounts: number[], days: number): number {
  let left = 1;
  let right = Math.max(...pageCounts); // 20
  let boundary = 0;

  function isSatisfied(pagesPerDay: number): boolean {
    let dayCount = 0;

    for (const count of pageCounts) {
      dayCount += Math.ceil(count / pagesPerDay);
    }

    return dayCount <= days;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (isSatisfied(mid)) {
      boundary = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return boundary;
}

function runTests() {
  const tests: [number[], number, number][] = [
    // Example from book
    [[20, 15, 17, 10], 5, 17],
    [[20, 15, 17, 10], 14, 5],
    [[20, 15, 17, 10], 17, 4],
    // Edge case - single chapter
    [[10], 5, 2],
    // Edge case - days = chapters
    [[1, 2, 3], 3, 3],
    // Edge case - more days than max chapter pages
    [[20], 21, 1],
  ];

  for (const [pageCounts, days, want] of tests) {
    const got = minPagesPerDay(pageCounts, days);
    if (got !== want) {
      throw new Error(
        `\nminPagesPerDay(${JSON.stringify(pageCounts)}, ${days}): got: ${got}, want: ${want}\n`,
      );
    }
  }
}

runTests();
