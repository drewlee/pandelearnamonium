function isValidIsbn13(str) {
  if (!/^[\d-]+$/.test(str)) {
    return false;
  }

  str = str.replaceAll('-', '');

  if (str.length !== 13) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    let product = i % 2 === 0 ? Number(str[i]) : Number(str[i]) * 3;

    sum += product;
  }

  return sum % 10 === 0;
}
