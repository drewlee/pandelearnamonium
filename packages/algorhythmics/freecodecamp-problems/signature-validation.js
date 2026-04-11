const BASE_LC = 'a'.charCodeAt(0);
const BASE_UC = 'A'.charCodeAt(0);
const ALPHA_LEN = 26;

function getValue(code) {
  // Lower case letter
  if (code >= BASE_LC && code < BASE_LC + ALPHA_LEN) {
    return code - BASE_LC + 1;
  }

  // Upper case letter
  if (code >= BASE_UC && code < BASE_UC + ALPHA_LEN) {
    return code - BASE_UC + 27;
  }

  return 0;
}

function getCharSum(str) {
  let sum = 0;

  for (let i = 0; i < str.length; i++) {
    const code = str[i].charCodeAt(0);
    const val = getValue(code);

    sum += val;
  }

  return sum;
}

function verify(message, key, signature) {
  const msgSum = getCharSum(message);
  const keySum = getCharSum(key);
  const total = msgSum + keySum;

  return total === signature;
}
