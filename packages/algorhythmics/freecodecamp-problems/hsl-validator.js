function isValidHSL(hsl) {
  const regExp = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)\s*;?$/;

  const matches = hsl.match(regExp);
  if (!matches) {
    return false;
  }

  const hue = Number(matches[1]);
  const sat = Number(matches[2]);
  const lgt = Number(matches[3]);

  if (hue < 0 || hue > 360 || sat < 0 || sat > 100 || lgt < 0 || lgt > 100) {
    return false;
  }

  return true;
}
