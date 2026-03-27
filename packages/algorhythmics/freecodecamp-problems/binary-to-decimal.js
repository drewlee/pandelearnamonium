function toDecimal(binary) {
  let exponent = 0;
  let decimal = 0;

  for (let i = binary.length - 1; i >= 0; i--) {
    decimal += Number(binary[i]) * 2 ** exponent;
    exponent++;
  }

  return decimal;
}
