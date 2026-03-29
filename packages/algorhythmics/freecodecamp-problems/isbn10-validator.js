function isValidIsbn10(str) {
  const pattern = /^\d{9}(\d|X)$/;
  let nStr = str.replaceAll('-', '');

  if (!pattern.test(nStr)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < nStr.length; i++) {
    const num = nStr[i] === 'X' ? 10 : Number(nStr[i]);
    sum += num * (i + 1);
  }

  return sum % 11 === 0;
}
