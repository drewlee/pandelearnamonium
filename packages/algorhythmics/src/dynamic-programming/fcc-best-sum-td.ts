export default function bestSum(target: number, values: number[]): number[] | null {
  function bestSumRec(
    target: number,
    path: number[],
    memo: Map<string, number[] | null>,
  ): number[] | null {
    if (target === 0) {
      return [...path];
    }

    if (target < 0) {
      return null;
    }

    const key = `${target},${path[path.length - 1] ?? -1}`;
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    let best: number[] | null = null;

    for (const value of values) {
      path.push(value);
      const result = bestSumRec(target - value, path, memo);
      path.pop();

      if (result !== null && (best === null || result.length < best.length)) {
        best = result;
      }
    }

    memo.set(key, best);
    return best;
  }

  const memo = new Map<string, number[] | null>();
  const res = bestSumRec(target, [], memo);

  return res;
}

// console.log(bestSum(7, [5, 3, 4, 7]));
// console.log(bestSum(8, [2, 3, 5]));
// console.log(bestSum(8, [1, 4, 5]));
console.log(bestSum(100, [1, 2, 5, 25]));
