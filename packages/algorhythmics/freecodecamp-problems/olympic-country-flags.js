function getFlag(code) {
  // Each flag emoji is composed of 2 regional indicator symbols.
  // Convert each character code into a regional indicator code point.
  const baseRegIndic = 0x1f1e6; // 🇦
  const offset = 65; // 'A'.codePointAt(0)
  let flag = '';

  for (const char of code) {
    const regIndic = baseRegIndic + char.codePointAt(0) - offset;
    const codePoint = String.fromCodePoint(regIndic);

    flag += codePoint;
  }

  return flag;
}
