function isValidHex(str) {
  const regExp = /^#([a-f0-9]{3}|[a-f0-9]{6})$/i;

  return regExp.test(str);
}
