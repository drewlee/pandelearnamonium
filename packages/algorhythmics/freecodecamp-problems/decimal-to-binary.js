function toBinary(decimal) {
  let number = decimal;
  let binary = '';

  while (number > 0) {
    const remainder = number % 2;
    binary = Number(remainder) + binary;
    number = Math.floor(number / 2);
  }

  return binary;
}
