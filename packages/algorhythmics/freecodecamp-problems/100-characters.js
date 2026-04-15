function oneHundred(chars) {
  const n = Math.ceil(100 / chars.length);
  const result = chars.repeat(n);

  return result.slice(0, 100);
}
