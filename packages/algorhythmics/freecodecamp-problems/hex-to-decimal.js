const A_CODE = 'A'.charCodeAt(0);
const F_CODE = 'F'.charCodeAt(0);

function getDigit(char) {
  const code = char.charCodeAt(0);

  if (code >= A_CODE && code <= F_CODE) {
    return code - A_CODE + 10;
  }

  return Number(char);
}

function hexToDecimal(hex) {
  let result = 0;

  for (let i = hex.length - 1; i >= 0; i--) {
    const digit = getDigit(hex[i]);
    const exp = hex.length - i - 1;

    result += digit * Math.pow(16, exp);
  }

  return result;
}
