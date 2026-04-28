const nums = new Map([
  [0, 'zero'],
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
  [4, 'four'],
  [5, 'five'],
  [6, 'six'],
  [7, 'seven'],
  [8, 'eight'],
  [9, 'nine'],
  [10, 'ten'],
  [11, 'eleven'],
  [12, 'twelve'],
  [13, 'thirteen'],
  [14, 'fourteen'],
  [15, 'fifteen'],
  [16, 'sixteen'],
  [17, 'seventeen'],
  [18, 'eighteen'],
  [19, 'nineteen'],
  [20, 'twenty'],
  [30, 'thirty'],
  [40, 'forty'],
  [50, 'fifty'],
  [60, 'sixty'],
  [70, 'seventy'],
  [80, 'eighty'],
  [90, 'ninety'],
]);

function getNumberWords(n) {
  if (n < 20) {
    return nums.get(n);
  }

  let result = '';
  let digits = n;
  let place = 1;

  while (digits > 0) {
    const digit = digits % 10;

    if (digit > 0) {
      result = (place === 1 ? '-' : '') + nums.get(digit * place) + result;
    }

    digits = Math.floor(digits / 10);
    place *= 10;
  }

  return result;
}
