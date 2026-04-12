/*
 * Formula:
 * n! / (r! * (n - r)!)
 * n = 52
 * r = input
 */
const facMemo = [1, 1];
const CARDS_NUM = 52;
const CARDS_FAC = calcFactorial(CARDS_NUM);

function calcFactorial(num) {
  if (facMemo[num] !== undefined) {
    return facMemo[num];
  }

  for (let i = facMemo.length; i <= num; i++) {
    facMemo[i] = facMemo[i - 1] * i;
  }

  return facMemo[num];
}

function combinations(cards) {
  const pickFac = calcFactorial(cards);
  const remFac = calcFactorial(CARDS_NUM - cards);
  const result = Math.round(CARDS_FAC / (pickFac * remFac));

  return result;
}
