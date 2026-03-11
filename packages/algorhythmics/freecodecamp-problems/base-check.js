function isValidNumber(n, base) {
  const baseNum = 10;
  const baseAlpha = 'a'.charCodeAt(0);

  for (const char of n) {
    let nValue = Number(char);

    if (Number.isNaN(nValue)) {
      const code = char.toLowerCase().charCodeAt(0);
      nValue = baseNum + code - baseAlpha;
    }

    if (nValue >= base) {
      return false;
    }
  }

  return true;
}
