const fibArr = [0, 1];

for (let i = 2; i < 13; i++) {
  fibArr[i] = fibArr[i - 1] + fibArr[i - 2];
}

const fib = new Set(fibArr);

function capitalizeFibonacci(str) {
  let nStr = '';

  for (let i = 0; i < str.length; i++) {
    let char = str[i].toLowerCase();

    if (fib.has(i)) {
      char = char.toUpperCase();
    }

    nStr += char;
  }

  return nStr;
}
